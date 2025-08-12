import { Input } from '~/components/ui/input'

export default function CompanyName() {
    return (
        <div>
            <h1 className="text-xl font-medium mb-3">1. Company name</h1>
            <div className='text-sm mb-5'>
                This name will be used to check your virality and will appear when you post events and on your digital tickets
            </div>
            <div>
                <Input
                    className='py-5 rounded-full shadow-none text-sm'
                    placeholder='ACME Choral'
                    name='organiser_name'
                    required
                />
            </div>
        </div>
    )
}
