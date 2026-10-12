import { Link } from '@inertiajs/react';
import {
    Boxes,
    CalendarClock,
    CalendarDays,
    FolderGit2,
    LayoutGrid,
    Mail,
    MapPin,
    Package,
    Shield,
    Swords,
    TicketPercent,
    Users,
    ShoppingCart,
    SlidersHorizontal,
    Store,
    Tag,
    Trophy,
    UserRound,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';
import attributes from '@/routes/attributes';
import categories from '@/routes/categories';
import coupons from '@/routes/coupons';
import adminCustomers from '@/routes/admin/customers';
import inventory from '@/routes/admin/inventory';
import adminOrders from '@/routes/admin/orders';
import adminProducts from '@/routes/admin/products';
import adminEvents from '@/routes/admin/events';
import adminPlayers from '@/routes/admin/players';
import adminTeams from '@/routes/admin/teams';
import adminNewsletters from '@/routes/admin/newsletters';
import adminMatches from '@/routes/admin/matches';
import adminVenues from '@/routes/admin/venues';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Shop',
        href: adminProducts.index(),
        icon: Store,
        children: [
            { title: 'Categories', href: categories.index(), icon: Tag },
            { title: 'Products', href: adminProducts.index(), icon: Package },
            {
                title: 'Attributes',
                href: attributes.index(),
                icon: SlidersHorizontal,
            },
            { title: 'Inventory', href: inventory.index(), icon: Boxes },
            { title: 'Orders', href: adminOrders.index(), icon: ShoppingCart },
            { title: 'Customers', href: adminCustomers.index(), icon: Users },
            { title: 'Coupons', href: coupons.index(), icon: TicketPercent },
        ],
    },
    {
        title: 'Club',
        href: adminTeams.index(),
        icon: Trophy,
        children: [
            { title: 'Players', href: adminPlayers.index(), icon: UserRound },
            { title: 'Events', href: adminEvents.index(), icon: CalendarDays },
            { title: 'Teams', href: adminTeams.index(), icon: Shield },
        ],
    },
    {
        title: 'Match Center',
        href: adminVenues.index(),
        icon: Swords,
        children: [
            {
                title: 'Matches',
                href: adminMatches.index(),
                icon: CalendarClock,
            },
            { title: 'Venues', href: adminVenues.index(), icon: MapPin },
        ],
    },
    {
        title: 'Newsletter',
        href: adminNewsletters.index(),
        icon: Mail,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Live site',
        href: '/',
        icon: FolderGit2,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
