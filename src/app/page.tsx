"use client";

import { useState } from "react";
import type { AnalyzeContentOutput } from "@/ai/flows/analyze-content-for-credibility";
import AppHeader from "@/components/app/header";
import ContentForm from "@/components/app/content-form";
import ResultDisplay from "@/components/app/result-display";
import { Loader2, ShieldCheck, Home as HomeIcon, RefreshCcw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { analyzeContent } from "./actions";
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeContentOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formKey, setFormKey] = useState(Date.now());

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

  const handleReset = () => {
    setIsLoading(false);
    setAnalysisResult(null);
    setError(null);
    setFormKey(Date.now());
  };


  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold tracking-tight">Clear Truth</h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" isActive>
                <HomeIcon />
                Home
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="min-h-screen bg-background text-foreground">
          <AppHeader />
          <main className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto grid gap-8">
              <ContentForm key={formKey} onAnalyze={handleAnalysis} isLoading={isLoading} />
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
              {(analysisResult || error) && (
                <Button variant="destructive" onClick={handleReset} className="w-full">
                  <RefreshCcw className="mr-2 h-4 w-4" /> Reset
                </Button>
              )}
            </div>
          </main>
        </div>
      </SidebarInset>
    </>
  );
}
