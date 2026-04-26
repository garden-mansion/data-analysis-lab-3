import type { FinancialDynamicItem } from '@/features/google-ai-studio-api';
import type { FC } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface FinancialDynamicsLinearChartProps {
  financialDynamicsLinearChartData: FinancialDynamicItem[];
}

export const FinancialDynamicsLinearChart: FC<
  FinancialDynamicsLinearChartProps
> = ({ financialDynamicsLinearChartData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Динамика доходов и расходов',
      },
    },
  };

  const labels = financialDynamicsLinearChartData.map(
    (financialDynamicItem) => financialDynamicItem.period,
  );
  const incomeData = financialDynamicsLinearChartData.map(
    (financialDynamicItem) => financialDynamicItem.income,
  );
  const expenseData = financialDynamicsLinearChartData.map(
    (financialDynamicItem) => financialDynamicItem.expense,
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'Доходы',
        data: incomeData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Расходы',
        data: expenseData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
};
