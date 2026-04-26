export interface AiAgentApiError {
  error: {
    code: number;
    message: string;
    status: string;
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isAiAgentApiError = (obj: any): obj is AiAgentApiError =>
  typeof obj === 'object' &&
  obj !== null &&
  typeof obj.error === 'object' &&
  obj.error !== null &&
  typeof obj.error.code === 'number' &&
  typeof obj.error.message === 'string' &&
  typeof obj.error.status === 'string';
