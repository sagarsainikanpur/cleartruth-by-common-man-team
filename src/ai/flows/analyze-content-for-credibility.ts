'use server';
/**
 * @fileOverview Yeh file content ko credibility ke liye analyze karne wala AI flow define karti hai.
 *
 * - analyzeContentForCredibility - Content ko credibility ke liye analyze karne wala function.
 * - AnalyzeContentInput - `analyzeContentForCredibility` function ke liye input type.
 * - AnalyzeContentOutput - `analyzeContentForCredibility` function ka return type.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Zod ka istemal karke hum input ka schema define kar rahe hain.
// Isse type-safety milti hai aur validation aasan ho jaata hai.
const AnalyzeContentInputSchema = z.object({
  content: z
    .string()
    .describe('Woh content jise analyze karna hai. Yeh text, URL, ya document ka data URI ho sakta hai.'),
  language: z.string().optional().describe('The language for the analysis result. Default is English.'),
});
export type AnalyzeContentInput = z.infer<typeof AnalyzeContentInputSchema>;

// Yahan hum output ka schema define kar rahe hain.
const AnalyzeContentOutputSchema = z.object({
  credibilityScore: z
    .number()
    .describe('Content ki credibility batane wala score (0 se 1 tak).'),
  explanation: z
    .string()
    .describe('Credibility findings ka detailed explanation. Explanation mein diye gaye URLs markdown links [Source Name](https://example.com) ke format mein hone chahiye.'),
});
export type AnalyzeContentOutput = z.infer<typeof AnalyzeContentOutputSchema>;


// Yeh function hamare flow ko call karne ke liye ek wrapper hai.
export async function analyzeContentForCredibility(
  input: AnalyzeContentInput
): Promise<AnalyzeContentOutput> {
  return analyzeContentFlow(input);
}

// Yahan hum AI model ke liye prompt define kar rahe hain.
const analyzeContentPrompt = ai.definePrompt({
  name: 'analyzeContentPrompt',
  input: {schema: AnalyzeContentInputSchema},
  output: {schema: AnalyzeContentOutputSchema}, // Output ko structured format mein paane ke liye.
  prompt: `You are an expert at analyzing content for credibility. Your task is to provide a credibility score and a detailed explanation.

Analyze the following content for credibility. Cross-reference it against multiple datasets and fact-checking sources.
- If the provided content is an image (like a newspaper clipping or screenshot), you MUST perform OCR to extract any text within it before proceeding with the analysis.
- Based on your analysis of the text (either provided directly or extracted via OCR), assign a credibility score from 0 (not credible) to 1 (highly credible).
- Provide a detailed explanation for your score in the requested language: {{language}}.
- In your explanation, it is crucial that you include verified alternatives and reliable sources.
- Any URLs you provide in the explanation must be formatted as markdown links, for example: [Google](https://www.google.com).

Content to Analyze: {{media url=content}}`,
});

// Yeh hamara main Genkit flow hai.
const analyzeContentFlow = ai.defineFlow(
  {
    name: 'analyzeContentFlow',
    inputSchema: AnalyzeContentInputSchema,
    outputSchema: AnalyzeContentOutputSchema,
  },
  async input => {
    // Prompt ko input ke saath call karte hain.
    const {output} = await analyzeContentPrompt(input);
    // AI se mile output ko return karte hain.
    return output!;
  }
);
