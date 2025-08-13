import { Switch } from '@radix-ui/react-switch'
import { BellRing, ChevronDown, Globe, HandCoins, Languages } from 'lucide-react'
import { Form } from 'react-router'

export default function Preferences() {
    return (
        <div>
            <Form className="mt-4 w-full flex flex-col gap-5">
                <div className="flex bg-gray-50 items-start rounded-md p-4">
                    <BellRing />
                    <div className="flex-1 space-y-1 mx-4 ">
                        <p className="text-sm font-medium leading-none">
                            Push Notifications
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Send notifications to device.
                        </p>
                    </div>
                    <Switch disabled checked />
                </div>

                <section className="flex flex-col md:flex-row items-stretch gap-5">
                    <div className="flex-1 flex bg-gray-50 items-start space-x-4 rounded-md p-4">
                        <Languages />
                        <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">
                                Default language
                            </p>
                            <p className="text-sm text-muted-foreground">
                                <span>English (UK)</span> | Default
                            </p>
                        </div>
                        <div className="rounded-full p-1 transition hover:bg-gray-200">
                            <ChevronDown />
                        </div>
                    </div>
                    <div className="flex-1  flex bg-gray-50 items-start space-x-4 rounded-md p-4">
                        <Globe />
                        <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">
                                Country
                            </p>
                            <p className="text-sm text-muted-foreground">
                                <span>Nigeria</span>
                            </p>
                        </div>
                        <div className="rounded-full p-1 transition hover:bg-gray-200">
                            <ChevronDown />
                        </div>
                    </div>
                </section>
                <section className="flex flex-col md:flex-row items-stretch gap-5">
                    <div className="flex-1 flex bg-gray-50 items-start space-x-4 rounded-md p-4">
                        <HandCoins />
                        <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">
                                Currency
                            </p>
                            <p className="text-sm text-muted-foreground">
                                <span>Nigerian Naira (NGN)</span> | Default
                            </p>
                        </div>
                        <div className="rounded-full p-1 transition hover:bg-gray-200">
                            <ChevronDown />
                        </div>
                    </div>
                </section>
            </Form>
        </div>
    )
}
