import z from 'zod';

const categorySchema = z.object({
  category: z
    .string()
    .describe("Название категории (например, 'Продукты', 'Транспорт')"),
  amount: z.number().describe('Сумма трат по этой категории'),
});

const dynamicsSchema = z.object({
  period: z.string().describe('Период (дата в формате YYYY-MM-DD или неделя)'),
  income: z.number().describe('Сумма поступлений за период'),
  expense: z.number().describe('Сумма расходов за период'),
});

export const analysisResponseSchema = z.object({
  analysis_text: z
    .string()
    .describe(
      'Подробный текстовый анализ: выводы, инсайты, общий баланс, советы.',
    ),
  categories_pie_chart: z
    .array(categorySchema)
    .describe('Топ категорий трат для круговой диаграммы'),
  dynamics_chart: z
    .array(dynamicsSchema)
    .describe('Динамика доходов и расходов по времени для графика'),
});

export type FinancialAnalysis = z.infer<typeof analysisResponseSchema>;
export type ExpensesCategory = z.infer<typeof categorySchema>;
export type FinancialDynamicItem = z.infer<typeof dynamicsSchema>;
