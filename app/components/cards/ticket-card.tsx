import EditTicket from '~/routes/_user.my-events_.$slug/edit-ticket'
import FormatPrice from '../utility/format-price'
import { DeleteTicket } from '~/routes/_user.my-events_.$slug/delete-ticket'

export default function TicketCard({ ticket, user = 'user' }: { ticket: Ticket, user?: "user" | 'organiser' }) {
    return (
        <div
            className="border-t-5 rounded-md px-4 py-7 text-black border min-w-55 max-w-55 w-55 h-70 hover:shadow-lg transition overflow-hidden relative"
            style={{ borderTopColor: ticket.theme, background: ticket.theme + '17' }}
        >
            <p className="text-sm font-light">
                <FormatPrice price={ticket.price} />
            </p>

            <h5 className='font-bold tracking-tighter text-xl capitalize' style={{ color: ticket.theme }}>{ticket.name}</h5>
            <p className='text-sm text-muted-foreground mt-1'>{ticket.quantityAvailable} units</p>


            {/* Absolute elements */}
            {user === 'organiser' && (
                <div className="absolute left-1 bottom-1 rounded-full border border-gray-100 bg-white">
                    <div className="flex flex-col items-start">
                        <div className='cursor-pointer hover:bg-gray-100 transition p-2 rounded-t-full' title='Edit Ticket'>
                            <EditTicket ticket={ticket} />
                        </div>

                        <div className='cursor-pointer hover:bg-red-50 hover:text-destructive transition p-2 rounded-b-full' title='Delete Ticket'>
                            <DeleteTicket ticket={ticket} />
                        </div>
                    </div>
                </div>
            )}

            <div style={{ backgroundColor: ticket.theme }} className='h-20 w-20 absolute -bottom-8 -right-8 rounded' />
        </div>
    )
}

