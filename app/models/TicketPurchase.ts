interface TicketPurchase extends Model {
  userId: string;
  ticketId: string;
  user: Pick<User, 'id' | 'name' | 'email'>;
  reference: string | null;
  amount: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  code: string;
  currency: 'NGN' | 'USD' | 'EUR' | 'GBP';
  payment_method: 'paystack' | 'stripe' | 'paypal';
  ticket: Ticket
}