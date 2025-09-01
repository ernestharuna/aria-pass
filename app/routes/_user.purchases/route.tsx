import client from '~/http/client';
import type { Route } from '../_user.purchases/+types/route';
import { redirect, useSearchParams, type MetaFunction } from 'react-router';
import { useEffect, useState } from 'react';
import { Ticket, UserStar } from 'lucide-react';
import RecordFilter from '~/components/utility/record-filter';
import PurchaseStatus from '~/components/utility/purchase-status';
import FormatPrice from '~/components/utility/format-price';
import { defaultMeta } from '~/lib/meta';

export const meta: MetaFunction = (args) => {
    return [
        ...defaultMeta(args) || [],
        { title: "Purchases | AriaPass" },
    ];
}

export async function clientLoader() {
    try {
        const { data } = await client.get('/api/tickets/purchases');

        return { tickets: data }
    } catch ({ response }: any) {
        console.error(response);
        return redirect('/dashboard')
    }
}

export default function MyEvents({ loaderData }: Route.ComponentProps) {
    const { tickets }: { tickets: TicketPurchase[] } = loaderData;
    console.log(tickets);

    const [searchParams] = useSearchParams();
    const [filteredData, setFilteredData] = useState<TicketPurchase[]>(tickets);

    const FILTERS = [
        {
            label: "Tickets",
            icon: <Ticket size={16} strokeWidth={1} />,
        },
        {
            label: "Memberships",
            icon: <UserStar size={16} strokeWidth={1} />,
        },
    ]

    useEffect(() => {
        const filtered = tickets.filter((item: any) => {
            if (searchParams.get("status")) {
                return item.status === searchParams.get("status");
            }
            return true;
        });
        setFilteredData(filtered);
    }, [searchParams, tickets]);

    return (
        <div>
            <section>
                <div className="flex flex-col lg:flex-row gap-7 justify-between lg:items-end">
                    <div>
                        <h1 className='text-primary text-3xl font-bold tracking-tight mb-5'>
                            Purchases
                        </h1>
                        <small></small>
                        <RecordFilter data={FILTERS} />
                    </div>
                </div>

                {(filteredData && filteredData.length) ? (
                    <div className="grid grid-cols-1 gap-6 pt-8 items-stretch justify-start">
                        {filteredData.map((purchase) => (
                            <div className='p-4 rounded-lg bg-gray-50' key={purchase.id}>
                                <small>{purchase.ticket.name}</small>
                                <div className="flex items-start justify-between mb-2">
                                    <div className="font-bold">
                                        <FormatPrice price={purchase.ticket.price} />
                                    </div>
                                    <PurchaseStatus status={purchase.status} />
                                </div>
                                <div className="font-mono text-xs">
                                    {purchase.code}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='pt-20 flex flex-col items-start gap-5'>
                        <p className="text-light text-sm text-muted-foreground text-center">
                            {searchParams.get('status')
                                ? <span>
                                    No {searchParams.get('status')} events
                                </span>
                                : <span>
                                    No purchases yet
                                </span>
                            }
                        </p>
                    </div>
                )}
            </section>
        </div>
    )
}
