'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

import mammoth from 'mammoth';            // DOCX
import * as XLSX from 'xlsx';             // XLSX
import Tesseract from 'tesseract.js';     // OCR for images

const AnalyzeContentInputSchema = z.object({
  content: z.string(), // text | URL | data URI
  language: z.string().optional(),
});
export type AnalyzeContentInput = z.infer<typeof AnalyzeContentInputSchema>;

const AnalyzeContentOutputSchema = z.object({
  credibilityScore: z.number(),
  explanation: z.string(),
});
export type AnalyzeContentOutput = z.infer<typeof AnalyzeContentOutputSchema>;

export async function analyzeContentForCredibility(
  input: AnalyzeContentInput
): Promise<AnalyzeContentOutput> {
  return analyzeContentFlow(input);
}

// Define the prompt
const analyzeContentPrompt = ai.definePrompt({
  name: 'analyzeContentPrompt',
  input: {schema: z.object({ content: z.string(), language: z.string().optional() })},
  output: {schema: AnalyzeContentOutputSchema},
  prompt: `You are an expert at analyzing content for credibility.

Analyze the following content for credibility. Cross-reference it against multiple datasets and fact-checking sources.
- Assign a credibility score from 0 (not credible) to 1 (highly credible).
- Provide a detailed explanation in {{language}} (default: English).
- Include reliable alternatives and sources.
- Any URLs you include must be markdown links, e.g. [Google](https://www.google.com).

Content to Analyze:
{{{content}}}`,
});

// Helper: run OCR on images
async function extractTextFromImage(buffer: Buffer): Promise<string> {
  const { data: { text } } = await Tesseract.recognize(buffer, 'eng');
  return text.trim();
}

// Main flow
const analyzeContentFlow = ai.defineFlow(
  {
    name: 'analyzeContentFlow',
    inputSchema: AnalyzeContentInputSchema,
    outputSchema: AnalyzeContentOutputSchema,
  },
  async input => {
    let content = input.content;

    if (content.startsWith('data:')) {
      const [meta, base64] = content.split(',');
      const mime = meta.split(';')[0].slice(5);
      const buffer = Buffer.from(base64, 'base64');

      try {
        if (mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          const result = await mammoth.extractRawText({ buffer });
          content = result.value;
        } else if (mime === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          const workbook = XLSX.read(buffer, { type: 'buffer' });
          content = Object.values(workbook.Sheets)
            .map(sheet => XLSX.utils.sheet_to_csv(sheet as any))
            .join('\n');
        } else if (mime.startsWith('image/')) {
          content = await extractTextFromImage(buffer);
        } else {
          content = '[Unsupported file format: could not extract text]';
        }
      } catch (err) {
        console.error('Extraction error:', err);
        content = '[Error extracting content from file]';
      }
    }

    // Call Gemini with plain text only
    const { output } = await analyzeContentPrompt({
      ...input,
      content,
    });

    return output!;
  }
);
