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
import { Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
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
                <Shield className="h-6 w-6" />
                <CardTitle className="text-3xl">{t('privacyPolicy.title')}</CardTitle>
              </div>
              <CardDescription>
                {t('privacyPolicy.lastUpdated', { date: currentDate })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{t('privacyPolicy.introduction')}</p>
              
              <h3 className="text-xl font-semibold pt-4">{t('privacyPolicy.informationWeCollect.title')}</h3>
              <p>{t('privacyPolicy.informationWeCollect.content')}</p>

              <h3 className="text-xl font-semibold pt-4">{t('privacyPolicy.howWeUseYourInformation.title')}</h3>
              <p>{t('privacyPolicy.howWeUseYourInformation.content')}</p>

              <h3 className="text-xl font-semibold pt-4">{t('privacyPolicy.dataSecurity.title')}</h3>
              <p>{t('privacyPolicy.dataSecurity.content')}</p>

              <h3 className="text-xl font-semibold pt-4">{t('privacyPolicy.changesToThisPolicy.title')}</h3>
              <p>{t('privacyPolicy.changesToThisPolicy.content')}</p>

              <h3 className="text-xl font-semibold pt-4">{t('privacyPolicy.contactUs.title')}</h3>
              <p>{t('privacyPolicy.contactUs.content')}</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
