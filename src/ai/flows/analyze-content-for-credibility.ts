'use server';
/**
 * @fileOverview Analyzes content using AI to determine its credibility and provides an explanation of the findings.
 *
 * - analyzeContentForCredibility - A function that analyzes content for credibility.
 * - AnalyzeContentInput - The input type for the analyzeContentForCredibility function.
 * - AnalyzeContentOutput - The return type for the analyzeContentForCredibility function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeContentInputSchema = z.object({
  content: z
    .string()
    .describe('The content to analyze, which can be text, a URL, an image data URI, or a document.'),
});
export type AnalyzeContentInput = z.infer<typeof AnalyzeContentInputSchema>;

const AnalyzeContentOutputSchema = z.object({
  credibilityScore: z
    .number()
    .describe('A score indicating the credibility of the content (0-1).'),
  explanation: z
    .string()
    .describe('A detailed explanation of the credibility findings. Any URLs in the explanation should be formatted as markdown links, like [Source Name](https://example.com).'),
});
export type AnalyzeContentOutput = z.infer<typeof AnalyzeContentOutputSchema>;

export async function analyzeContentForCredibility(
  input: AnalyzeContentInput
): Promise<AnalyzeContentOutput> {
  return analyzeContentFlow(input);
}

const analyzeContentPrompt = ai.definePrompt({
  name: 'analyzeContentPrompt',
  input: {schema: AnalyzeContentInputSchema},
  output: {schema: AnalyzeContentOutputSchema},
  prompt: `Analyze the following content for credibility, cross-referencing against multiple datasets and fact-checking APIs. Assign a credibility score (0-1) and provide a detailed explanation of your findings. It is crucial that you include verified alternatives and sources. Any URLs you provide in the explanation must be formatted as markdown links, for example: [Google](https://www.google.com).

Content: {{{content}}}`,
});

const analyzeContentFlow = ai.defineFlow(
  {
    name: 'analyzeContentFlow',
    inputSchema: AnalyzeContentInputSchema,
    outputSchema: AnalyzeContentOutputSchema,
  },
  async input => {
    const {output} = await analyzeContentPrompt(input);
    return output!;
  }
);
