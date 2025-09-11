import { ShieldCheck } from 'lucide-react';

export default function AppHeader() {
  return (
    <header className="py-6 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 text-center">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Clear Truth
          </h1>
        </div>
        <p className="mt-2 text-center text-lg text-muted-foreground">
          Your AI-powered partner for content verification.
        </p>
      </div>
    </header>
  );
}
