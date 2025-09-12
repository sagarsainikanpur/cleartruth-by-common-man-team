'use client';

import { usePathname } from 'next/navigation';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Home, Info } from 'lucide-react';

export default function AppNavigation() {
    const pathname = usePathname();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton href="/" isActive={pathname === '/'}>
                    <Home />
                    Home
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton href="/about" isActive={pathname === '/about'}>
                    <Info />
                    About
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
