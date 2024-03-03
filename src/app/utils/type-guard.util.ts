import _ from 'lodash-es'
import { FINANCIAL_ABBREVIATION_MAPPING, FinancialAbbreviation } from './financial-number.model'

/**
 * Type Guard to indicate whether the value passed is a "usable" `number`
 * @param {any} value
 * @returns {boolean}
 */
export function isNumber(value: any): value is number {
  return (_.isNumber(value) || typeof value === 'bigint') && _.isFinite(value)
}

/**
 * Type Guard to indicate whether the string passed is a supported number abbreviation
 * @param {string} value
 * @returns {boolean}
 */
export function isFinancialAbbreviation(value: string): value is FinancialAbbreviation {
  return _.has(FINANCIAL_ABBREVIATION_MAPPING, value)
}

/**
 * Type Guard to indicate whether the tuple passed in following the correct types
 * @param {any[]} parts
 * @returns {boolean}
 */
export function financialNumberValidate(parts: any[]): parts is [number, FinancialAbbreviation] {
  if (parts == null) {
    return false
  }

  if (!_.isArray(parts)) {
    return false
  }

  if (parts == null || parts.length === 0 || parts.length === 1 || parts.length > 2) {
    return false
  }

  const [first, second] = parts

  if (!isNumber(first)) {
    return false
  }

  if (!isFinancialAbbreviation(second)) {
    return false
  }

  return true
}
