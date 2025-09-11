'use server';

/**
 * @fileOverview Credibility assessment ka detailed explanation generate karta hai, jisme verified alternatives aur sources shamil hain.
 *
 * - generateCredibilityExplanation - Credibility explanation generate karne wala function.
 * - GenerateCredibilityExplanationInput - `generateCredibilityExplanation` function ke liye input type.
 * - GenerateCredibilityExplanationOutput - `generateCredibilityExplanation` function ka return type.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input schema definition using Zod.
const GenerateCredibilityExplanationInputSchema = z.object({
  content: z.string().describe('Woh content jise credibility ke liye analyze karna hai.'),
  credibilityScore: z.number().describe('Content ka credibility score.'),
  analysisFindings: z.string().describe('Content ka AI analysis findings.'),
});
export type GenerateCredibilityExplanationInput = z.infer<typeof GenerateCredibilityExplanationInputSchema>;

// Output schema definition using Zod.
const GenerateCredibilityExplanationOutputSchema = z.object({
  explanation: z.string().describe('Credibility assessment ka detailed explanation, jisme verified alternatives aur sources shamil hain.'),
});
export type GenerateCredibilityExplanationOutput = z.infer<typeof GenerateCredibilityExplanationOutputSchema>;

// Wrapper function to call the flow.
export async function generateCredibilityExplanation(input: GenerateCredibilityExplanationInput): Promise<GenerateCredibilityExplanationOutput> {
  return generateCredibilityExplanationFlow(input);
}

// AI prompt definition.
const prompt = ai.definePrompt({
  name: 'generateCredibilityExplanationPrompt',
  input: {schema: GenerateCredibilityExplanationInputSchema},
  output: {schema: GenerateCredibilityExplanationOutputSchema},
  prompt: `You are an AI assistant designed to provide detailed explanations of credibility assessments.

  Based on the content, credibility score, and AI analysis findings, generate a comprehensive explanation of the credibility assessment. Include verified alternatives and sources to support your explanation.

  Content: {{{content}}}
  Credibility Score: {{{credibilityScore}}}
  Analysis Findings: {{{analysisFindings}}}

  Explanation:`,
});

// Genkit flow definition.
const generateCredibilityExplanationFlow = ai.defineFlow(
  {
    name: 'generateCredibilityExplanationFlow',
    inputSchema: GenerateCredibilityExplanationInputSchema,
    outputSchema: GenerateCredibilityExplanationOutputSchema,
  },
  async input => {
    // Call the prompt and get the output.
    const {output} = await prompt(input);
    return output!;
  }
);
