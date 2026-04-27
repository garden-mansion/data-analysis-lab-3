import { useState, type FC } from 'react';
import { type FinancialAnalysis } from './features/google-ai-studio-api';
import { AIAgentResponseWrapper } from './widgets/ai-agent-response-wrapper';
import { FinancesAnalysisForm } from './widgets/finances-csv-data-file-input';
import { TypographyH2, TypographyP } from './shared/typography';

const App: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [aiAgentResponse, setAiAgentResponse] =
    useState<FinancialAnalysis | null>(null);

  return (
    <div className="flex flex-col gap-8 items-center p-4 min-h-dvh">
      <div className="xl:max-w-4xl md:max-w-xl sm:max-w-lg max-w-sm mx-auto">
        <TypographyH2>#FINANCE_ANALYSIS</TypographyH2>

        <TypographyP>
          Примитивная аналитика финансов. С помощью формы ниже передайте CSV
          файл, с выпиской из банка, содержащий данные о ваших доходах и
          расходах за месяц.
        </TypographyP>

        <TypographyP>
          Можете задать дополнительный промпт ИИ-агенту.
        </TypographyP>

        <TypographyP>
          <span className="font-semibold text-red-600">ВАЖНО:</span> для
          корректной работы нужен VPN. Прошу заметить что ИИ-агент работает
          немного медленно, проявите терпение.
        </TypographyP>
      </div>

      <FinancesAnalysisForm
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
