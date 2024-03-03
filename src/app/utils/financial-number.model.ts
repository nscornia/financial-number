export const FinancialAbbreviationValues = ['k', 'm', 'b'] as const
export type FinancialAbbreviation = (typeof FinancialAbbreviationValues)[number]

export const FINANCIAL_ABBREVIATION_MAPPING: Record<FinancialAbbreviation, number> = {
  k: 1000,
  m: 1000000,
  b: 1000000000,
} as const
