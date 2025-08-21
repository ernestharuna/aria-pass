import EditTicket from '~/routes/_user.my-events_.$slug/edit-ticket'
import FormatPrice from '../utility/format-price'

export default function TicketCard({ ticket, user = 'user' }: { ticket: Ticket, user?: "user" | 'organiser' }) {
    return (
        <div
            className="border-t-5 rounded px-4 py-7 text-black border min-w-50 max-w-50 w-50 h-70 hover:shadow-lg transition overflow-hidden relative"
            style={{ borderTopColor: ticket.theme }}
        >
            <p className="text-sm font-light">
                <FormatPrice price={ticket.price} />
            </p>
            <h5 className='font-semibold tracking-tight text-xl'>{ticket.name}</h5>

            <div style={{ backgroundColor: ticket.theme }} className='h-20 w-20 absolute -bottom-8 -right-8 rounded' />

            {user === 'organiser' && (
                <div className="absolute bottom-4">
                    <EditTicket ticket={ticket} />
                </div>
            )}

        </div>
    )
}
