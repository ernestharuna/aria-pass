import { useState } from "react";
import { Button } from "~/components/ui/button";
import OpeningPage from "./opening-page";
import CompanyName from "./company-name";
import { ArrowLeft, Save } from "lucide-react";
import { Form, Link, redirect } from "react-router";
import CompanyBio from "./company-bio";
import CompanyContact from "./company-contact";
import { parseForm } from "~/lib/utils";
import formRequest from "~/http/form.request";
import { toast } from "sonner";
import type { Route } from "../_user.organiser-request/+types/route";

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
        <section className=" py-16">
            <div className="flex gap-18 items-stretch justify-around">
                <div className="">
                    {step > 1 &&
                        <div className="flex items-stretch justify-between mb-8">
                            <Button onClick={() => setStep((i) => i - 1)} variant={"outline"} size={"sm"} className="rounded-full shadow-none px-6">
                                <ArrowLeft size={14} />
                                <span>Back</span>
                            </Button>

                            <Button variant={"secondary"} size={"sm"} className="cursor-pointer rounded-full shadow-none px-6">
                                <span>Save as Draft</span>
                                <Save size={14} />
                            </Button>
                        </div>
                    }

                    <Form className="min-h-[25vh] lg:max-w-3xl lg:min-w-xl max-h-[25vh]" method="POST">
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
                </div>
                <div className="hidden lg:flex flex-col gap-4 text-sm">
                    <Link to={""} className={`${step === 1 ? 'font-bold bg-gray-100 rounded-lg' : ''} px-4 py-2`}>Getting started</Link>
                    <Link to={""} className={`${step === 2 ? 'font-bold bg-gray-100 rounded-lg' : ''} px-4 py-2`}>1. Company name</Link>
                    <Link to={""} className={`${step === 3 ? 'font-bold bg-gray-100 rounded-lg' : ''} px-4 py-2`}>2. Company Biography</Link>
                    <Link to={""} className={`${step === 4 ? 'font-bold bg-gray-100 rounded-lg' : ''} px-4 py-2`}>3. Company Information</Link>
                </div>
            </div>
        </section>
    )
}
