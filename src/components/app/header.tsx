import { ShieldCheck } from 'lucide-react';
import { SidebarTrigger } from '../ui/sidebar';

export default function AppHeader() {
  return (
    <header className="py-4 border-b">
      <div className="container mx-auto px-4 flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <div className="flex items-center gap-3 flex-1">
          <ShieldCheck className="h-8 w-8 text-primary hidden sm:block" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Clear Truth
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Your AI-powered partner for content verification.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
