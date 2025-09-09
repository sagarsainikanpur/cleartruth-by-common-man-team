import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import AppFooter from '@/components/app/footer';
import AppNavigation from '@/components/app/navigation';
import { ThemeProvider } from '@/components/app/theme-provider';
import { ThemeToggle } from '@/components/app/theme-toggle';
import AppLogo from '@/components/app/logo';
import { I18nProvider } from '@/lib/i18n/index.tsx';

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
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><defs><linearGradient id=%22grad%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22><stop offset=%220%25%22 style=%22stop-color:rgb(59,130,246);stop-opacity:1%22 /><stop offset=%22100%25%22 style=%22stop-color:rgb(251,146,60);stop-opacity:1%22 /></linearGradient></defs><path fill=%22url(%23grad)%22 d=%22M50,5A45,45,0,1,1,5,50,45,45,0,0,1,50,5Zm0,8A37,37,0,1,0,87,50,37,37,0,0,0,50,13Zm20.4,43.2-24,24a1,1,0,0,1-1.4,0l-12-12a1,1,0,0,1,1.4-1.4L46,78.6,69,55.6a1,1,0,0,1,1.4,1.4Z%22/></svg>"
        />
      </head>
      {/* `body` tag mein font-family aur antialiasing apply kar rahe hain. */}
      {/* `suppressHydrationWarning` ko body par bhi lagaya gaya hai
          kyunki kuch extensions body tag mein attributes inject karte hain. */}
      <body className="font-body antialiased" suppressHydrationWarning>
        <I18nProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {/* SidebarProvider poore app mein sidebar state ko manage karta hai. */}
                <SidebarProvider>
                    <Sidebar className="rounded-tr-[22px] rounded-br-[22px]">
                        <SidebarHeader>
                        <div className="flex items-center gap-2">
                            <AppLogo className="h-8 w-auto text-primary" />
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
        </I18nProvider>
        {/* Toaster component app mein notifications (toasts) dikhane ke liye hai. */}
        <Toaster />
      </body>
    </html>
  );
}
