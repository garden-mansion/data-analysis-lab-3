import { useState, type FC } from 'react';
import { type FinancialAnalysis } from './features/google-ai-studio-api';
import { AIAgentResponseWrapper } from './widgets/ai-agent-response-wrapper';
import { FinancesCSVDataFileInput } from './widgets/finances-csv-data-file-input';

const App: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [aiAgentResponse, setAiAgentResponse] =
    useState<FinancialAnalysis | null>(null);

  return (
    <div className="flex flex-col gap-8 items-center p-4">
      <FinancesCSVDataFileInput
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setAiAgentResponse={setAiAgentResponse}
      />

      <AIAgentResponseWrapper
        isLoading={isLoading}
        aiAgentResponse={aiAgentResponse}
      />
    </div>
  );
};

export default App;
