import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from '@/components/ui/sidebar';
import AppFooter from '@/components/app/footer';
import { Home, Info, ShieldCheck } from 'lucide-react';
import AppNavigation from '@/components/app/navigation';
import { ThemeProvider } from '@/components/app/theme-provider';
import { ThemeToggle } from '@/components/app/theme-toggle';

// Yeh file app ka root layout hai. Har page is layout ke andar render hota hai.

// `metadata` object SEO aur browser tab information ke liye hai.
export const metadata: Metadata = {
  title: 'Clear Truth',
  description: 'AI-powered content verification to determine credibility.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // `suppressHydrationWarning` hydration errors ko ignore karne mein madad karta hai,
    // jo aksar browser extensions (jaise Grammarly) ke kaaran aate hain.
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts (Inter) ko load kar rahe hain. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </head>
      {/* `body` tag mein font-family aur antialiasing apply kar rahe hain. */}
      {/* `suppressHydrationWarning` ko body par bhi lagaya gaya hai
          kyunki kuch extensions body tag mein attributes inject karte hain. */}
      <body className="font-body antialiased" suppressHydrationWarning>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {/* SidebarProvider poore app mein sidebar state ko manage karta hai. */}
            <SidebarProvider>
                {/* Sidebar component */}
                <Sidebar>
                    <SidebarHeader>
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-6 w-6 text-primary" />
                        <h2 className="text-xl font-semibold tracking-tight">Clear Truth</h2>
                    </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <AppNavigation />
                    </SidebarContent>
                    <SidebarFooter>
                        <ThemeToggle />
                    </SidebarFooter>
                </Sidebar>
                <SidebarInset>
                    <div className="flex flex-col min-h-screen">
                        <main className="flex-grow">
                            {children}
                        </main>
                        <AppFooter />
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </ThemeProvider>
        {/* Toaster component app mein notifications (toasts) dikhane ke liye hai. */}
        <Toaster />
      </body>
    </html>
  );
}
