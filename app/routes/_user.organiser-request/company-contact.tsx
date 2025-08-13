import DefaultButton from '~/components/buttons/default-button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

export default function CompanyContact() {
    return (
        <div>
            <h1 className="text-xl font-medium mb-3">3. Contact Information</h1>
            <div className='text-sm mb-5'>
                Provide contact details for your profile, this will be used to contact you by your clients
            </div>
            <div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mb-7'>
                    <div>
                        <Label className='mb-1 text-sm font-light ms-2' htmlFor='website'>Website</Label>
                        <Input
                            className='py-5 rounded-full shadow-none'
                            placeholder='www.acme.org'
                            name='website_url'
                            id='website'
                            type='url'
                        />
                    </div>
                    <div>
                        <Label className='mb-1 text-sm font-light ms-2' htmlFor='email'>Email</Label>
                        <Input
                            className='py-5 rounded-full shadow-none'
                            placeholder='acme@choral.com'
                            name='contact_email'
                            id='email'
                            type='email'
                        />
                    </div>
                </div>
                <div className='mb-14'>
                    <Label className='mb-1 text-sm font-light ms-2' htmlFor='phone'>Phone</Label>
                    <Input
                        id='phone'
                        className='py-5 rounded-full shadow-none'
                        placeholder='0800 000 0000'
                        name='contact_phone'
                        type='tel'
                        maxLength={11}

                        onInput={(e) => {
                            const input = e.target as HTMLInputElement;
                            const remaining = 11 - input.value.length;
                            const counter = document.getElementById("phone-counter");
                            if (counter) counter.textContent = `${remaining} characters left`;
                        }}
                    />
                    <div id="phone-counter" className="ms-2 text-sm text-gray-500 mt-1">
                        11 characters left
                    </div>
                </div>
                <div>
                    <DefaultButton text='Submit Request' />
                </div>
            </div>
        </div>
    )
}
