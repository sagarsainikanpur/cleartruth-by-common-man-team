'use server';

/**
 * @fileOverview Yeh file AI analysis ke baad content ko credibility score assign karne ke liye Genkit flow define karti hai.
 *
 * - assignCredibilityScore - Ek async function jo content leta hai aur credibility score return karta hai.
 * - AssignCredibilityScoreInput - `assignCredibilityScore` function ke liye input type.
 * - AssignCredibilityScoreOutput - `assignCredibilityScore` function ka output type.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input ka schema Zod se define kar rahe hain.
const AssignCredibilityScoreInputSchema = z.object({
  analysisResult: z
    .string()
    .describe('Content ka analysis result, jisme fact-checking aur cross-referencing shamil hai.'),
});
export type AssignCredibilityScoreInput = z.infer<
  typeof AssignCredibilityScoreInputSchema
>;

// Output ka schema Zod se define kar rahe hain.
const AssignCredibilityScoreOutputSchema = z.object({
  credibilityScore: z
    .number()
    .describe(
      '0 se 1 ke beech ka score jo content ki credibility batata hai, jahan 0 bilkul unreliable aur 1 bilkul reliable hai.'
    ),
  explanation: z.string().describe('Credibility score kaise determine kiya gaya, uska detailed explanation.'),
});
export type AssignCredibilityScoreOutput = z.infer<
  typeof AssignCredibilityScoreOutputSchema
>;

// Yeh function hamare flow ko call karne ke liye ek wrapper hai.
export async function assignCredibilityScore(
  input: AssignCredibilityScoreInput
): Promise<AssignCredibilityScoreOutput> {
  return assignCredibilityScoreFlow(input);
}

// AI model ke liye prompt.
const assignCredibilityScorePrompt = ai.definePrompt({
  name: 'assignCredibilityScorePrompt',
  input: {schema: AssignCredibilityScoreInputSchema},
  output: {schema: AssignCredibilityScoreOutputSchema},
  prompt: `You are an AI assistant tasked with assigning a credibility score to content based on its analysis.

  Analyze the following content analysis result and assign a credibility score between 0 and 1.
  Also, provide a detailed explanation of how you determined the credibility score.

  Analysis Result: {{{analysisResult}}}

  Credibility Score (0-1): 
  Explanation: `,
});


// Main Genkit flow.
const assignCredibilityScoreFlow = ai.defineFlow(
  {
    name: 'assignCredibilityScoreFlow',
    inputSchema: AssignCredibilityScoreInputSchema,
    outputSchema: AssignCredibilityScoreOutputSchema,
  },
  async input => {
    // Prompt ko call karke AI se result lete hain.
    const {output} = await assignCredibilityScorePrompt(input);
    // Result ko return karte hain.
    return output!;
  }
);
