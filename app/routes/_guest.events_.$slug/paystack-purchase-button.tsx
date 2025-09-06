import { PaystackButton } from "react-paystack"
import { useState } from 'react'
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { PAYSTACK_PUBK } from "~/config/defaults";
import client from "~/http/client";

export default function PaystackPurchaseButton({ ticket, user }: { ticket: Ticket, user?: User | undefined }) {
    const publicKey = PAYSTACK_PUBK;

    const amount = parseInt(ticket.price) * 100; // Paystack expects amount in kobo

    const [form, setForm] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: ""
    })

    const navigate = useNavigate();

    const componentProps = {
        email: form.email,
        amount,
        metadata: {
            custom_fields: [
                {
                    display_name: "Name",
                    variable_name: "name",
                    value: form.name,
                },
                {
                    display_name: "Phone",
                    variable_name: "phone",
                    value: form.phone,
                }
            ]
        },
        publicKey,
        text: "Buy Now",

        // {
        //     "reference": "T116036255015831",
        //     "trans": "5088330337",
        //     "status": "success",
        //     "message": "Approved",
        //     "transaction": "5088330337",
        //     "trxref": "T116036255015831",
        //     "redirecturl": "?trxref=T116036255015831&reference=T116036255015831"
        // }

        onSuccess: async (e: any) => {
            // console.log(e);
            const promise = new Promise(async (resolve, reject) => {
                try {
                    if (e.status !== "success") {
                        toast.error("Payment failed", {
                            description: "Please try again later, contact support——support@owenahub.com"
                        });
                        throw new Error("Payment failed");
                    }

                    await client.post(`/api/tickets/purchases/${ticket.id}`, {
                        reference: e.reference,
                        amount: amount / 100,
                        currency: "NGN",
                        payment_method: "paystack",
                        purchaser_name: form.name,
                        purchaser_email: form.email,
                    });

                    resolve('Congratulations! Ticket purchased');
                    return navigate(`/purchases`);
                } catch (error: any) {
                    toast.warning('Something went wrong', {
                        description: error.response?.data?.error || "Please try again later"
                    });
                    reject(error);
                }
            });

            toast.promise(promise, {
                loading: 'Processing purchase...',
                success: (message) => message as string,
                error: 'Error occured!, contact support——support@owenahub.com',
            });

            return;
        },
        onClose: () => {
            toast.warning('Got cold feet? 🤔', {
                description: "You can contact our founder directly—ernest@owenahub.com"
            });
        },
    }

    return (
        <div className="animated fadeIn">
            <div className="mt-0">
                <form className="mb-5">
                    <div className="bg-muted rounded-md p-3 mb-4">
                        <div className="text-xs uppercase text-primary">
                            {ticket.name} ticket
                        </div>
                        <div className="text-lg font-bold tracking-tighter">
                            ₦{(amount / 100).toLocaleString()}
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mb-5">
                        <div className="flex-1">
                            <Label className="mb-1 cursor-not-allowed" htmlFor="name">Name</Label>
                            <Input
                                className="py-5"
                                type="text"
                                id="name"
                                placeholder="First Last"
                                value={form.name}
                                onChange={(e) => setForm((i) => (
                                    { ...i, name: e.target.value }
                                ))}
                                disabled={Boolean(user?.id)}
                            />
                        </div>
                        <div className="flex-1">
                            <Label className="mb-1 cursor-not-allowed" htmlFor="email">Email</Label>
                            <Input
                                className="py-5"
                                type="text"
                                id="email"
                                placeholder="your@email.com"
                                value={form.email}
                                onChange={(e) => setForm((i) => (
                                    { ...i, email: e.target.value }
                                ))}
                                disabled={Boolean(user?.id)}
                            />
                        </div>
                    </div>
                    <Label className="mb-1">Phone</Label>
                    <Input
                        className="py-5 border border-gray-400"
                        type="text"
                        id="phone"
                        placeholder="0800 000 0000"
                        onChange={(e) => setForm((i) => (
                            { ...i, phone: e.target.value }
                        ))}
                    />
                </form>
                <PaystackButton
                    {...componentProps}
                    disabled={form.email.length < 5 || form.phone.length < 11}
                    className="w-full py-2.5 rounded-md bg-primary font-bold text-sm text-white cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-muted-foreground transition"
                />
            </div>
        </div>
    )
}