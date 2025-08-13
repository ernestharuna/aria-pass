import { useOutletContext } from 'react-router'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Switch } from '~/components/ui/switch'

export default function MyAccount() {
    const user: User = useOutletContext();

    return (
        <div >
            <div className='max-w-xl grid grid-cols-1 md:grid-cols-2 gap-5 mb-7'>
                <div>
                    <Input
                        className='py-6 rounded-full shadow-none'
                        defaultValue={user.name}
                        name='name'
                        disabled
                    />
                </div>
                <div>
                    <Input
                        className='py-6 rounded-full shadow-none'
                        defaultValue={user.email}
                        name='email'
                        disabled
                    />
                </div>
            </div>

            <div className="flex items-center space-x-2 mb-10">
                <Switch id="airplane-mode" checked disabled />
                <Label htmlFor="airplane-mode">Enable promotional emails</Label>
            </div>

            <div className='mb-14 max-w-xl flex items-center gap-4'>
                <Button className='rounded-full bg-primary-theme text-white'>
                    Save
                </Button>
                <Button variant={'outline'} className='rounded-full shadow-none'>
                    Cancel
                </Button>
            </div>
        </div>
    )
}
