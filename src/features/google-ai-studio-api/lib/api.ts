import { ApiError, GoogleGenAI } from '@google/genai';
import { SYSTEM_INSTRUCTIONS } from '../config/config';
import {
  analysisResponseSchema,
  type FinancialAnalysis,
} from '../model/zodSchemas';
import {
  isAiAgentApiError,
  type AiAgentApiError,
} from '../model/aiAgentApiError';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });

interface SendCsvDataParams {
  csvText: string;
  userPrompt?: string;
}

export const sendCSVData = async ({
  csvText,
  userPrompt,
}: SendCsvDataParams): Promise<
  FinancialAnalysis | AiAgentApiError | string
> => {
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
            {
              text: `Дополнительно: ${userPrompt ?? 'дополнительной аналитики не требуется'}`,
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
      return 'пустой ответ от ИИ-агента';
    }

    const parsedData = analysisResponseSchema.parse(JSON.parse(response));

    return parsedData;
  } catch (err) {
    try {
      const apiError = err as ApiError;
      const aiAgentApiError = JSON.parse(apiError.message);

      if (isAiAgentApiError(aiAgentApiError)) {
        return `${aiAgentApiError.error.code}: ${aiAgentApiError.error.message}. ${aiAgentApiError.error.status}`;
      }

      return `${apiError.status}: ${apiError.message}`;
    } catch {
      return 'ошибка на стороне ИИ-агента';
    }
  }
};
