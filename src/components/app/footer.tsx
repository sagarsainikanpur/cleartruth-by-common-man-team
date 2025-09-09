'use client';

import { useI18n } from "@/lib/i18n";
import Link from "next/link";

export default function AppFooter() {
    const { t } = useI18n();
    return (
        <footer className="border-t mt-auto">
            <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-center text-sm text-muted-foreground">
                    {t('footer.text', { year: new Date().getFullYear() })}
                </p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                    <Link href="/privacy-policy" className="hover:text-foreground transition-colors">{t('footer.privacy')}</Link>
                    <Link href="/terms-and-conditions" className="hover:text-foreground transition-colors">{t('footer.terms')}</Link>
                </div>
            </div>
        </footer>
    );
}
