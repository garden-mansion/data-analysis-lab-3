import { GoogleGenAI } from '@google/genai';
import { SYSTEM_INSTRUCTIONS } from '../config/config';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });

export const sendCSVData = async (csvText: string) => {
  try {
    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Вот мои данные в формате CSV:\n${csvText}`,
            },
            {
              text: 'Проведи анализ и подготовь данные для визуализации',
            },
          ],
        },
      ],
      config: {
        systemInstruction: {
          role: 'system',
          parts: [
            {
              text: SYSTEM_INSTRUCTIONS,
            },
          ],
        },
        tools: [
          {
            codeExecution: {},
          },
        ],
      },
    });

    const response = result.text;

    return response;
  } catch (err) {
    console.error(err);
  }
};
