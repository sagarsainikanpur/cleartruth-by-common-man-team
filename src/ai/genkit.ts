import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Yeh file Genkit ko initialize aur configure karti hai.

// `ai` object hamara main entry point hai Genkit ke features use karne ke liye.
export const ai = genkit({
  // Plugins Genkit ko extra functionality provide karte hain.
  // Yahan hum `googleAI` plugin use kar rahe hain taaki Google ke AI models (jaise Gemini) ko access kar sakein.
  plugins: [googleAI()],
  // Yahan hum default model set kar rahe hain jo use hoga agar koi specific model mention nahi kiya gaya.
  // 'gemini-2.5-flash' ek fast aur capable model hai.
  model: 'googleai/gemini-2.5-flash',
});
