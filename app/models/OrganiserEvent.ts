interface OrganiserEvent extends Model {
    bannerUrl: string;
    city: string;
    country: string;
    description: string;
    engagementVisible: boolean | number; // Could be treated as a boolean (1 for true, 0 for false)
    extraInfo: string;
    slug: string;

    startTime: string;
    endTime: string | null;

    date: Date;

    status: 'draft' | 'suspended' | 'cancelled' | 'completed' | 'published',

    tickets: Ticket[];

    title: string;
    venueAddress: string;
    venueName: string;
    views: any[];
}