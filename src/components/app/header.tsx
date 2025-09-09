'use client';

import AppLogo from './logo';
import { SidebarTrigger } from '../ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { Languages } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useIsMobile } from '@/hooks/use-mobile';

// Yeh component application ka header hai.
export default function AppHeader() {
  const { language, setLanguage } = useI18n();
  const isMobile = useIsMobile();
  const languages = ["English", "Hindi", "Marathi", "Gujarati", "Telugu"];
  const languageMap: { [key: string]: string } = {
    English: 'en',
    Hindi: 'hi',
    Marathi: 'mr',
    Gujarati: 'gu',
    Telugu: 'te',
  };
  const currentLanguageName = Object.keys(languageMap).find(key => languageMap[key] === language) || "English";

  return (
    <header className="py-4 border-b">
      <div className="container mx-auto px-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* SidebarTrigger for mobile view */}
          <SidebarTrigger className="md:hidden" />

          {/* Logo - compact on small screens, full on larger screens */}
          <AppLogo />
        </div>

        <div className="flex items-center gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size={isMobile ? "icon" : "default"}>
                        <Languages className={isMobile ? "h-5 w-5" : "mr-2 h-4 w-4"} />
                        <span className="hidden sm:inline">{currentLanguageName}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {languages.map((lang) => (
                        <DropdownMenuItem key={lang} onSelect={() => setLanguage(languageMap[lang])}>
                            {lang}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
