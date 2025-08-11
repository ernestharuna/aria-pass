import { useState } from "react";
import { Button } from "~/components/ui/button";
import OpeningPage from "./opening-page";
import CompanyName from "./company-name";
import { ArrowLeft, Save } from "lucide-react";
import { Form, redirect } from "react-router";
import CompanyBio from "./company-bio";
import CompanyContact from "./company-contact";
import type { Route } from "../dashboard/+types/route";
import { parseForm } from "~/lib/utils";
import formRequest from "~/http/form.request";
import { toast } from "sonner";

export async function clientAction({ request }: Route.ClientActionArgs) {
    const credentials = await parseForm(request);

    try {
        await formRequest(credentials, 'organiser-profile', 'POST');
        toast.info("Request Sent!", {
            description: "We will give you a response in 2 business days"
        });
        return redirect('/dashboard')
    } catch ({ response }: any) {
        console.log(response);
        toast.error('Oops, something went wrong');
        return null;
    }
}

export default function OrganiserRequest() {
    const [step, setStep] = useState(1);

    return (
        <section className="mx-auto max-w-4xl lg:min-w-4xl py-16">
            <div className="flex items-stretch justify-between">
                {step > 1 &&
                    <Button onClick={() => setStep((i) => i - 1)} variant={"outline"} size={"sm"} className="rounded-full shadow-none px-6">
                        <ArrowLeft size={14} />
                        <span>Back</span>
                    </Button>
                }

                {step > 1 &&
                    <Button variant={"secondary"} size={"sm"} className="cursor-pointer rounded-full shadow-none px-6">
                        <span>Save as Draft</span>
                        <Save size={14} />
                    </Button>
                }
            </div>

            <Form className="pt-8 min-h-[30vh] max-h-[30vh]" method="POST">
                <div className={step === 1 ? "block animated fadeIn" : "hidden"}>
                    <OpeningPage />
                </div>
                <div className={step === 2 ? "block animated fadeIn" : "hidden"}>
                    <CompanyName />
                </div>
                <div className={step === 3 ? "block animated fadeIn" : "hidden"}>
                    <CompanyBio />
                </div>
                <div className={step === 4 ? "block animated fadeIn" : "hidden"}>
                    <CompanyContact />
                </div>
            </Form>

            <div className={step === 4 ? 'hidden' : 'block'}>
                <Button
                    className="w-full md:w-sm cursor-pointer block rounded-full"
                    onClick={() => setStep((i) => i + 1)}
                >
                    {step === 1 ? "Get started" : "Continue"}
                </Button>
            </div>
        </section>
    )
}
