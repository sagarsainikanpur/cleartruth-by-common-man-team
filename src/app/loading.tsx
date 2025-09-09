import { Loader2 } from 'lucide-react';
import AppLogo from '@/components/app/logo';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="flex flex-col items-center gap-6">
        <AppLogo className="h-12 w-auto" />
        <div className="flex items-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="text-lg text-muted-foreground">Loading...</p>
        </div>
      </div>
    </div>
  );
}
