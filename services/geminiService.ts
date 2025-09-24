import { GoogleGenAI, Type } from "@google/genai";
import { InfographicData, StylePreset, KeyInsight } from '../types';
import { templates } from '../components/icons';

// Step 1: Analyze the provided text to get structured data
export const summarizeTextForInfographic = async (
  text: string,
  apiKey: string
): Promise<InfographicData> => {
  if (!apiKey) throw new Error('Gemini API key is required.');
  if (!text) throw new Error('Transcript text is required.');

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    You are an expert content analyst. A user has provided a block of text, likely a transcript from a video or an article.
    Your task is to analyze this text and structure it for a vertical infographic.

    Based on the provided text, please generate:
    1. A short, compelling title for the entire text (max 10 words).
    2. A list of 3 to 4 of the most important key insights from the text.

    For each insight, provide:
    - A short, impactful title (3-6 words).
    - A brief, one-sentence description summarizing the point.
    - A single, simple keyword that represents the insight's core concept (e.g., 'idea', 'growth', 'strategy', 'goal') for icon generation.

    Respond ONLY with a valid JSON object. Do not include any other text, markdown formatting, or explanations.
  `;

  const schema = {
    type: Type.OBJECT,
    properties: {
      sourceData: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "A short, compelling title for the entire text." },
        },
        required: ['title'],
      },
      insights: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "A short, impactful title (3-6 words)." },
            description: { type: Type.STRING, description: "A brief, one-sentence summary of the point." },
            icon_keyword: { type: Type.STRING, description: "A single keyword representing the insight's core concept." },
          },
          required: ['title', 'description', 'icon_keyword'],
        },
      },
    },
    required: ['sourceData', 'insights'],
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${prompt}\n\nTEXT TO ANALYZE:\n\n${text}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    let jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    if (!result.sourceData || !result.insights) {
        throw new Error("Invalid response format from Gemini API.");
    }
    
    if (result.insights.length > 4) {
        result.insights = result.insights.slice(0, 4);
    }

    return result as InfographicData;
  } catch (error) {
    console.error("Error summarizing text:", error);
    throw new Error(`Failed to analyze text: ${error instanceof Error ? error.message : String(error)}`);
  }
};


// Step 2: Use the structured data to generate icons for the infographic
export const generateInfographicIcons = async (
  insights: KeyInsight[],
  style: StylePreset,
  apiKey: string
): Promise<string[]> => {
  if (!apiKey) throw new Error('Gemini API key is required.');
  const ai = new GoogleGenAI({ apiKey });
  const template = templates[style];

  try {
    const iconPromises = insights.map(insight => {
      const prompt = template.prompt.replace('{keyword}', insight.icon_keyword);
      return ai.models.generateImages({
          model: 'imagen-4.0-generate-001',
          prompt: prompt,
          config: {
            numberOfImages: 1,
            outputMimeType: 'image/png',
            aspectRatio: '1:1',
          },
      });
    });
  
    const responses = await Promise.all(iconPromises);
  
    return responses.map(response => {
      if (response.generatedImages && response.generatedImages.length > 0) {
          const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
          return `data:image/png;base64,${base64ImageBytes}`;
      }
      // This will be caught by the catch block below
      throw new Error("AI did not return an image for one of the icons.");
    });

  } catch (error) {
    console.error("Error generating infographic icons:", error);
    throw new Error(`Failed to generate infographic icons: ${error instanceof Error ? error.message : String(error)}`);
  }
};