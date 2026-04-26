import type { ExpensesCategory } from '@/features/google-ai-studio-api';
import type { FC } from 'react';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {
  generateRandomRgbaColors,
  updateAlphaInRgbaArray,
} from '@/shared/rgba';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoriesPieChartProps {
  categoriesPieChartData: ExpensesCategory[];
}

export const CategoriesPieChart: FC<CategoriesPieChartProps> = ({
  categoriesPieChartData,
}) => {
  const labels = categoriesPieChartData.map((dataItem) => dataItem.category);
  const data = categoriesPieChartData.map((category) => category.amount);
  const backgroundColor = generateRandomRgbaColors(data.length, 0.2);
  const borderColor = updateAlphaInRgbaArray(backgroundColor, 1);

  return (
    <Pie
      className="mb-4"
      data={{
        labels,
        datasets: [
          {
            label: `Потрачено руб.`,
            data,
            backgroundColor,
            borderColor,
          },
        ],
      }}
    />
  );
};
