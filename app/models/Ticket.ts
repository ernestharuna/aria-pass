interface Ticket extends Model {
    eventId: string,
    name: string,
    description: string,
    price: string,
    theme: string,
    quantityAvailable: number,
    ticketPurchases: number,
    purchases: TicketPurchase[];
}