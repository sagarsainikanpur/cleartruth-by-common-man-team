"use server";

import { analyzeContentForCredibility } from "@/ai/flows/analyze-content-for-credibility";

export async function analyzeContent(content: string) {
  if (!content || content.trim().length === 0) {
    return { data: null, error: "Content cannot be empty." };
  }
  try {
    const result = await analyzeContentForCredibility({ content });
    return { data: result, error: null };
  } catch (error) {
    console.error("AI analysis failed:", error);
    return { data: null, error: "Failed to analyze content. The AI service may be temporarily unavailable." };
  }
}
