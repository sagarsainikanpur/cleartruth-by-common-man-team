"use client";

import { useState } from "react";
import type { AnalyzeContentOutput } from "@/ai/flows/analyze-content-for-credibility";
import AppHeader from "@/components/app/header";
import ContentForm from "@/components/app/content-form";
import ResultDisplay from "@/components/app/result-display";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { analyzeContent } from "./actions";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeContentOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async (content: string) => {
    setIsLoading(true);
    setAnalysisResult(null);
    setError(null);

    try {
        const result = await analyzeContent(content);
        if (result.error || !result.data) {
            setError(result.error || "Analysis returned no data.");
        } else {
            setAnalysisResult(result.data);
        }
    } catch (e) {
        setError("An unexpected error occurred. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto grid gap-8">
          <ContentForm onAnalyze={handleAnalysis} isLoading={isLoading} />
          {isLoading && (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {analysisResult && <ResultDisplay result={analysisResult} />}
        </div>
      </main>
    </div>
  );
}
