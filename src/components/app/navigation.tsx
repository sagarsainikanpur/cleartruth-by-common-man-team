'use client';

import { usePathname } from 'next/navigation';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from '@/components/ui/sidebar';
import { Home, Info } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';

export default function AppNavigation() {
    const pathname = usePathname();
    const { t } = useI18n();
    const { setOpenMobile } = useSidebar();

    const handleLinkClick = () => {
        setOpenMobile(false);
    }

    return (
        <SidebarMenu className="p-4">
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/'}>
                    <Link href="/" onClick={handleLinkClick}>
                        <Home />
                        {t('navigation.home')}
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/about'}>
                    <Link href="/about" onClick={handleLinkClick}>
                        <Info />
                        {t('navigation.about')}
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
