// src/ai/flows/generate-credibility-explanation.ts
'use server';

/**
 * @fileOverview Generates a detailed explanation of the credibility assessment, including verified alternatives and sources.
 *
 * - generateCredibilityExplanation - A function that generates the credibility explanation.
 * - GenerateCredibilityExplanationInput - The input type for the generateCredibilityExplanation function.
 * - GenerateCredibilityExplanationOutput - The return type for the generateCredibilityExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCredibilityExplanationInputSchema = z.object({
  content: z.string().describe('The content to be analyzed for credibility.'),
  credibilityScore: z.number().describe('The credibility score of the content.'),
  analysisFindings: z.string().describe('The AI analysis findings of the content.'),
});
export type GenerateCredibilityExplanationInput = z.infer<typeof GenerateCredibilityExplanationInputSchema>;

const GenerateCredibilityExplanationOutputSchema = z.object({
  explanation: z.string().describe('A detailed explanation of the credibility assessment, including verified alternatives and sources.'),
});
export type GenerateCredibilityExplanationOutput = z.infer<typeof GenerateCredibilityExplanationOutputSchema>;

export async function generateCredibilityExplanation(input: GenerateCredibilityExplanationInput): Promise<GenerateCredibilityExplanationOutput> {
  return generateCredibilityExplanationFlow(input);
}

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

const generateCredibilityExplanationFlow = ai.defineFlow(
  {
    name: 'generateCredibilityExplanationFlow',
    inputSchema: GenerateCredibilityExplanationInputSchema,
    outputSchema: GenerateCredibilityExplanationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
