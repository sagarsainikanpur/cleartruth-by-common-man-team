'use client';

import AppHeader from "@/components/app/header";
import AppLogo from "@/components/app/logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import { Info, Code, Users } from "lucide-react";

export default function AboutPage() {
  const { t } = useI18n();
  const appVersion = "1.0.0"; // You can manage this version number as needed

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <Card className="overflow-hidden">
            <CardHeader className="bg-muted/30">
              <div className="flex items-center gap-4">
                <AppLogo className="h-10 w-auto" />
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <CardTitle className="text-3xl">{t('aboutPage.main.title')}</CardTitle>
               <CardDescription>
                  {t('aboutPage.main.description')}
                </CardDescription>
              <p>
                {t('aboutPage.main.p1')}
              </p>
              <p>
                {t('aboutPage.main.p2')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                {t('aboutPage.appInfo.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex justify-between">
                  <span>{t('aboutPage.appInfo.version')}:</span>
                  <span className="font-mono">{appVersion}</span>
                </li>
                <li className="flex justify-between">
                  <span>{t('aboutPage.appInfo.framework')}:</span>
                  <span>Next.js</span>
                </li>
                 <li className="flex justify-between">
                  <span>{t('aboutPage.appInfo.uiLibrary')}:</span>
                  <span>ShadCN UI, TailwindCSS</span>
                </li>
                 <li className="flex justify-between">
                  <span>{t('aboutPage.appInfo.aiIntegration')}:</span>
                  <span>Genkit</span>
                </li>
              </ul>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {t('aboutPage.team.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('aboutPage.team.description', { teamName: '<span class="font-semibold text-foreground">Comman Man Team</span>' }) }} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
