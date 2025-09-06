import { Plus } from 'lucide-react';
import { useFetcher } from 'react-router';
import { Button } from '~/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '~/components/ui/select';

export default function NewTeammate({ events }: { events: OrganiserEvent[] }) {
    const fetcher = useFetcher();
    
    return (
        <div>
            <Dialog>
                <>
                    <DialogTrigger asChild>
                        <Button
                            disabled={events.length === 0}
                            variant={'outline'}
                            className='cursor-pointer text-xs px-20 flex items-center gap-2'
                        >
                            <span>Add Teammate</span> <Plus size={10} />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <fetcher.Form method='POST' action='members'>
                            <DialogHeader>
                                <DialogTitle>Add a teammate</DialogTitle>
                                <DialogDescription className='text-xs text-amber-800 bg-amber-50 p-2.5 rounded-md'>
                                    Ensure to reach out to new teammates as emails maybe redirected to spam/junk folder
                                </DialogDescription>
                            </DialogHeader>

                            <hr className='my-4' />

                            <div className="grid gap-4">
                                <div className="grid gap-1">
                                    <Label className='font-light text-sm' htmlFor="role">Assigned Event</Label>
                                    <Select name='event_slug' required>
                                        <SelectTrigger className="w-full" id="role">
                                            <SelectValue placeholder="Select event" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Select an event to add this person</SelectLabel>
                                                {events.map((ev) => (
                                                    <SelectItem value={ev.slug} key={ev.id}>
                                                        {ev.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-1">
                                    <Label className='font-light text-sm' htmlFor="email">Email Address</Label>
                                    <Input id="email" name="email" placeholder="user@email.com" required />
                                </div>
                                <div className="grid gap-1">
                                    <Label className='font-light text-sm' htmlFor="name">Full name</Label>
                                    <Input id="name" name="full_name" placeholder="Wolfgang Peter" required />
                                </div>
                                <div className="grid gap-1">
                                    <Label className='font-light text-sm' htmlFor="role">Role at event</Label>
                                    <Select name='role_type' required>
                                        <SelectTrigger className="w-full" id="role">
                                            <SelectValue placeholder="Select teammate role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Join this event as:</SelectLabel>
                                                <SelectItem value="performer">Performing Artist</SelectItem>
                                                <SelectItem value="staff">Staff Member</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid gap-1">
                                    <Button type="submit">Add member</Button>
                                </div>
                            </div>
                        </fetcher.Form>
                    </DialogContent>
                </>
            </Dialog>

        </div>
    )
}
