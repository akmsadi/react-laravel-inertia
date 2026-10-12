import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import type { Paginated } from '@/types';

type Props = {
    data: Paginated<unknown>;
    label: string;
};

export default function ResourcePagination({ data, label }: Props) {
    if (data.last_page <= 1) {
        return null;
    }

    return (
        <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
                Page {data.current_page} of {data.last_page} ({data.total}{' '}
                {label})
            </span>
            <div className="flex gap-2">
                {data.prev_page_url && (
                    <Button asChild variant="outline" size="sm">
                        <Link href={data.prev_page_url}>Previous</Link>
                    </Button>
                )}
                {data.next_page_url && (
                    <Button asChild variant="outline" size="sm">
                        <Link href={data.next_page_url}>Next</Link>
                    </Button>
                )}
            </div>
        </div>
    );
}
