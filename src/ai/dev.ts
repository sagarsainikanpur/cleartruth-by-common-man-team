import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-content-for-credibility.ts';
import '@/ai/flows/assign-credibility-score.ts';
import '@/ai/flows/generate-credibility-explanation.ts';