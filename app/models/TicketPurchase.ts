interface TicketPurchase extends Model{
  userId: string;
  ticketId: string;
  reference: string | null;
  amount: number;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  code: string;
  currency: 'NGN' | 'USD' | 'EUR' | 'GBP';
  payment_method: 'paystack' | 'stripe' | 'paypal';
  ticket: Ticket
}