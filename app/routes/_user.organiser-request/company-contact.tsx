import DefaultButton from '~/components/buttons/default-button'
import { Input } from '~/components/ui/input'

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
                        <Input
                            className='py-5 rounded-full shadow-none'
                            placeholder='www.acme.org'
                            name='website_url'
                        />
                    </div>
                    <div>
                        <Input
                            className='py-5 rounded-full shadow-none'
                            placeholder='acme@choral.com'
                            name='contact_email'
                        />
                    </div>
                </div>
                <div className='mb-14'>
                    <Input
                        className='py-5 rounded-full shadow-none'
                        placeholder='11 digit Nigerian phone'
                        name='contact_phone'
                        type='tel'
                    />
                </div>
                <div>
                    <DefaultButton text='Submit Request'/>
                </div>
            </div>
        </div>
    )
}
