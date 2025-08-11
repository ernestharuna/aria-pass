import { Textarea } from '~/components/ui/textarea'

export default function CompanyBio() {
    return (
        <div>
            <h1 className="text-xl font-medium mb-3">2. Company Biography</h1>
            <div className='text-sm mb-5'>
                Keep it simple; great profiles give real metrics and share their vision with their fans
            </div>
            <div>
                <Textarea
                    rows={5}
                    cols={20}
                    className='rounded-lg shadow-none text-sm'
                    placeholder='Amazing biography on ACME chorale'
                    name='biography'
                />
            </div>
        </div>
    )
}
