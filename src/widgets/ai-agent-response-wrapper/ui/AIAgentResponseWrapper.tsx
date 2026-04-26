import { Spinner } from '@/components/ui/spinner';
import type { FinancialAnalysis } from '@/features/google-ai-studio-api';
import { TypographyH3, TypographyH4, TypographyP } from '@/shared/typography';
import { type FC } from 'react';

import { CategoriesPieChart } from './CategoriesPieChart';

interface AIAgentResponseWrapperProps {
  aiAgentResponse: FinancialAnalysis | null;
  isLoading: boolean;
}

export const AIAgentResponseWrapper: FC<AIAgentResponseWrapperProps> = ({
  aiAgentResponse,
  isLoading,
}) => {
  if (isLoading) {
    return <Spinner />;
  }

  if (!aiAgentResponse) {
    return;
  }

  const {
    analysis_text: analysisText,
    categories_pie_chart: categoriesPieChartData,
  } = aiAgentResponse;

  return (
    <div className="flex flex-col gap-2 xl:max-w-4xl md:max-w-xl sm:max-w-lg max-w-sm mx-auto items-start">
      <TypographyH3>Текстовая аналитика от ИИ-агента</TypographyH3>
      <TypographyP>{analysisText}</TypographyP>

      <TypographyH3 className="mb-4">Визуализации</TypographyH3>

      <TypographyH4 className="mb-2">Категории трат</TypographyH4>

      <CategoriesPieChart categoriesPieChartData={categoriesPieChartData} />
    </div>
  );
};
