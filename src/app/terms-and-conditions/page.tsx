'use client';

import AppHeader from "@/components/app/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import { FileText } from "lucide-react";

export default function TermsAndConditionsPage() {
  const { t } = useI18n();
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6" />
                <CardTitle className="text-3xl">{t('termsAndConditions.title')}</CardTitle>
              </div>
              <CardDescription>
                {t('termsAndConditions.lastUpdated', { date: currentDate })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-xl font-semibold pt-4">{t('termsAndConditions.acceptance.title')}</h3>
              <p>{t('termsAndConditions.acceptance.content')}</p>
              
              <h3 className="text-xl font-semibold pt-4">{t('termsAndConditions.useOfService.title')}</h3>
              <p>{t('termsAndConditions.useOfService.content')}</p>
              
              <h3 className="text-xl font-semibold pt-4">{t('termsAndConditions.prohibitedConduct.title')}</h3>
              <p>{t('termsAndConditions.prohibitedConduct.content')}</p>

              <h3 className="text-xl font-semibold pt-4">{t('termsAndConditions.termination.title')}</h3>
              <p>{t('termsAndConditions.termination.content')}</p>

              <h3 className="text-xl font-semibold pt-4">{t('termsAndConditions.disclaimer.title')}</h3>
              <p>{t('termsAndConditions.disclaimer.content')}</p>

              <h3 className="text-xl font-semibold pt-4">{t('termsAndConditions.contactUs.title')}</h3>
              <p>{t('termsAndConditions.contactUs.content')}</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
