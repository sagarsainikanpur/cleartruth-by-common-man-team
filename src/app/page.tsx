"use client";

// Yeh "use client" directive batata hai ki yeh ek Client Component hai.
// Iska matlab hai ki iska code user ke browser mein run hoga aur isme React Hooks (jaise useState) use kiye ja sakte hain.

import { useState } from "react";
import type { AnalyzeContentOutput } from "@/ai/flows/analyze-content-for-credibility";
import AppHeader from "@/components/app/header";
import ContentForm from "@/components/app/content-form";
import ResultDisplay from "@/components/app/result-display";
import { Loader2, RefreshCcw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { analyzeContent } from "./actions";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

// Yeh hamara main page component hai.
export default function Home() {
  const { t, language } = useI18n();

  // State variables for managing the component's state.
  // `isLoading`: Analysis ke time loading spinner dikhane ke liye.
  const [isLoading, setIsLoading] = useState(false);
  // `analysisResult`: AI se mile result ko store karne ke liye.
  const [analysisResult, setAnalysisResult] = useState<AnalyzeContentOutput | null>(null);
  // `error`: Agar koi error aata hai to use store karne ke liye.
  const [error, setError] = useState<string | null>(null);
  // `formKey`: Form ko reset karne ke liye ek unique key.
  const [formKey, setFormKey] = useState(Date.now());


  // Yeh function content ko analyze karne ke liye call hota hai.
  const handleAnalysis = async (content: string) => {
    setIsLoading(true); // Loading state ko true set karte hain.
    setAnalysisResult(null); // Purana result clear karte hain.
    setError(null); // Purana error clear karte hain.

    try {
        // `analyzeContent` server action ko call karte hain.
        const result = await analyzeContent(content, language);
        if (!result) {
            setError("The server action failed to respond. Please check your network connection or try again later.");
        } else if (result.error || !result.data) {
            // Agar server se error milta hai ya data nahi milta.
            setError(result.error || "Analysis returned no data.");
        } else {
            // Agar result milta hai, to state mein save karte hain.
            setAnalysisResult(result.data);
        }
    } catch (e: any) {
        // Agar network ya koi unexpected error aata hai.
        setError(e.message || "An unexpected error occurred. Please try again.");
    } finally {
        // Chahe success ho ya error, loading state ko false set karte hain.
        setIsLoading(false);
    }
  };

  // Yeh function UI ko reset karne ke liye hai.
  const handleReset = () => {
    setIsLoading(false);
    setAnalysisResult(null);
    setError(null);
    // `formKey` ko update karke ContentForm component ko re-render aur reset karte hain.
    setFormKey(Date.now());
  };


  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          {/* ContentForm: Yahan user apna content input karta hai. */}
          <ContentForm key={formKey} onAnalyze={handleAnalysis} isLoading={isLoading} />
          
          {/* Jab analysis chal raha ho, tab loading spinner dikhao. */}
          {isLoading && (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          )}

          {/* Agar koi error ho, to use Alert component mein dikhao. */}
          {error && (
            <Alert variant="destructive" className="w-full">
              <AlertTitle>{t('error.title')}</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Jab analysis result aa jaye, to ResultDisplay component mein dikhao. */}
          {analysisResult && <ResultDisplay result={analysisResult} />}

          {/* Jab result ya error ho, to Reset button dikhao. */}
          {(analysisResult || error) && (
            <Button variant="outline" onClick={handleReset} className="w-full">
              <RefreshCcw className="mr-2 h-4 w-4" /> {t('common.reset')}
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
