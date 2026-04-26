import { GoogleGenAI } from '@google/genai';
import { SYSTEM_INSTRUCTIONS } from '../config/config';
import {
  analysisResponseSchema,
  type FinancialAnalysis,
} from '../model/zodSchemas';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });

export const sendCSVData = async (
  csvText: string,
): Promise<FinancialAnalysis | undefined> => {
  try {
    const result = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Вот мои данные в формате CSV:\n${csvText}`,
            },
            {
              text: 'Проведи анализ и подготовь данные в соответствии с заданной структурой',
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
        responseMimeType: 'application/json',
        responseJsonSchema: analysisResponseSchema.toJSONSchema(),
      },
    });

    const response = result.text;

    if (!response) {
      throw new Error('пустой ответ от ИИ-агента');
    }

    const parsedData = analysisResponseSchema.parse(JSON.parse(response));

    return parsedData;
  } catch (err) {
    console.error(err);
  }
};
