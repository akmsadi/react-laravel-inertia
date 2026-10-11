import { Link } from '@inertiajs/react';
import {
    FolderGit2,
    LayoutGrid,
    Package,
    ShoppingCart,
    SlidersHorizontal,
    Tag,
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
import adminOrders from '@/routes/admin/orders';
import adminProducts from '@/routes/admin/products';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Products',
        href: adminProducts.index(),
        icon: Package,
        children: [
            { title: 'Categories', href: categories.index(), icon: Tag },
            { title: 'Products', href: adminProducts.index(), icon: Package },
            {
                title: 'Attributes',
                href: attributes.index(),
                icon: SlidersHorizontal,
            },
        ],
    },
    {
        title: 'Orders',
        href: adminOrders.index(),
        icon: ShoppingCart,
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
