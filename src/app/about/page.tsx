import AppHeader from "@/components/app/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldCheck, Info, Code, Users } from "lucide-react";

export default function AboutPage() {
  const appVersion = "1.0.0"; // You can manage this version number as needed

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <Card className="overflow-hidden">
            <CardHeader className="bg-muted/30">
              <div className="flex items-center gap-4">
                <ShieldCheck className="h-10 w-10 text-primary" />
                <div>
                  <CardTitle className="text-3xl">Clear Truth</CardTitle>
                  <CardDescription>
                    AI-powered content verification
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p>
                In an era of information overload, distinguishing fact from
                fiction can be challenging. Clear Truth is an AI-powered
                content verification tool designed to help users determine the
                credibility of text, URLs, or documents.
              </p>
              <p>
                By leveraging advanced AI analysis, it provides a credibility
                score and a detailed explanation of the findings, empowering
                you to make informed decisions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                App Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex justify-between">
                  <span>App Version:</span>
                  <span className="font-mono">{appVersion}</span>
                </li>
                <li className="flex justify-between">
                  <span>Framework:</span>
                  <span>Next.js</span>
                </li>
                 <li className="flex justify-between">
                  <span>UI Library:</span>
                  <span>ShadCN UI, TailwindCSS</span>
                </li>
                 <li className="flex justify-between">
                  <span>AI Integration:</span>
                  <span>Genkit</span>
                </li>
              </ul>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Our Team
              </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    This application was proudly developed by the <span className="font-semibold text-foreground">Comman Man Team</span>.
                </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
