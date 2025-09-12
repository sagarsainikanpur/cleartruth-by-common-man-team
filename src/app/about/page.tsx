import AppHeader from "@/components/app/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>About Clear Truth</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
              <h3 className="font-semibold text-lg pt-4">Features</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Text Analysis</strong>: Paste any text to get an
                  instant credibility check.
                </li>
                <li>
                  <strong>URL Analysis</strong>: Enter a URL to analyze the
                  content of a webpage.
                </li>
                <li>
                  <strong>File Upload</strong>: Upload documents for a
                  comprehensive credibility assessment.
                </li>
                <li>
                  <strong>Credibility Score</strong>: Get a simple,
                  easy-to-understand score from 0 to 1.
                </li>
                <li>
                  <strong>Detailed Explanations</strong>: Understand the
                  reasoning behind the score with detailed explanations and links
                  to sources.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
