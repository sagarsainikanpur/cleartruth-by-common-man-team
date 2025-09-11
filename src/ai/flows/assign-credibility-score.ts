// src/ai/flows/assign-credibility-score.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for assigning a credibility score to content after AI analysis.
 *
 * - assignCredibilityScore - An async function that takes content as input and returns a credibility score.
 * - AssignCredibilityScoreInput - The input type for the assignCredibilityScore function.
 * - AssignCredibilityScoreOutput - The output type for the assignCredibilityScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssignCredibilityScoreInputSchema = z.object({
  analysisResult: z
    .string()
    .describe('The analysis result of the content, including fact-checking and cross-referencing.'),
});
export type AssignCredibilityScoreInput = z.infer<
  typeof AssignCredibilityScoreInputSchema
>;

const AssignCredibilityScoreOutputSchema = z.object({
  credibilityScore: z
    .number()
    .describe(
      'A score between 0 and 1 indicating the credibility of the content, where 0 is completely unreliable and 1 is completely reliable.'
    ),
  explanation: z.string().describe('A detailed explanation of how the credibility score was determined.'),
});
export type AssignCredibilityScoreOutput = z.infer<
  typeof AssignCredibilityScoreOutputSchema
>;

export async function assignCredibilityScore(
  input: AssignCredibilityScoreInput
): Promise<AssignCredibilityScoreOutput> {
  return assignCredibilityScoreFlow(input);
}

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

const assignCredibilityScoreFlow = ai.defineFlow(
  {
    name: 'assignCredibilityScoreFlow',
    inputSchema: AssignCredibilityScoreInputSchema,
    outputSchema: AssignCredibilityScoreOutputSchema,
  },
  async input => {
    const {output} = await assignCredibilityScorePrompt(input);
    return output!;
  }
);
