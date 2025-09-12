"use server";

// Yeh ek Next.js server action file hai.
// Iska matlab hai ki is file mein likha gaya code server par run hota hai, client ke browser mein nahi.

import { analyzeContentForCredibility } from "@/ai/flows/analyze-content-for-credibility";

/**
 * Yeh function content (text, URL, ya file data) ko credibility ke liye analyze karta hai.
 * @param content - Woh string jise analyze karna hai.
 * @returns - Ek object jismein ya to analysis ka data hoga ya error message.
 */
export async function analyzeContent(content: string) {
  // Pehle check karte hain ki content khali to nahi hai.
  if (!content || content.trim().length === 0) {
    return { data: null, error: "Content cannot be empty." }; // Agar khali hai, to error return karte hain.
  }
  try {
    // Yahan hum `analyzeContentForCredibility` AI flow ko call karte hain.
    // Yeh Genkit (AI) ke paas jaakar content ko process karega.
    const result = await analyzeContentForCredibility({ content });
    
    // Agar sab theek raha, to result ko data property mein return karte hain.
    return { data: result, error: null };
  } catch (error: any) {
    // Agar AI analysis mein koi error aata hai, to use console par log karte hain.
    console.error("AI analysis failed:", error);
    // Aur user-friendly error message return karte hain.
    const errorMessage = error.message || "Failed to analyze content. The AI service may be temporarily unavailable.";
    return { data: null, error: errorMessage };
  }
}
