import { AbstractControl, ValidationErrors } from '@angular/forms'
import _ from 'lodash-es'
import { FINANCIAL_ABBREVIATION_MAPPING } from './financial-number.model'
import { financialNumberValidate, isNumber } from './type-guard.util'

export const NOT_FINANCIAL_NUMBER_ERROR = {
  notFinancialNumber: {
    message: 'Invalid Financial Number Format. The format must be a number followed by a "k", "m", or "b"',
  },
}

/**
 * Simple Regex to create tokens for numbers and letters
 *
 */
export const FINANCIAL_NUMBER_SPLITTER_REGEX = /[a-zA-Z.]+|[-0-9.]+/g

/**
 * Angular Validator function for FormControl
 * @param control
 * @returns `null` if valid otherwise `{ notFinancialNumber: true }`
 */
export function financialNumberValidatorFn(control: AbstractControl): ValidationErrors | null {
  // console.log(control, control.value)

  const financialNumberParts = financialNumberSplitter(control?.value)
  const valid = financialNumberParts != null && financialNumberValidate(financialNumberParts)

  return !valid ? NOT_FINANCIAL_NUMBER_ERROR : null
}

/**
 * Splits a "Financial Number" string into tokens using a Regex
 * @param {string} value "Financial Number" string
 * @returns {} a tuple with the first value being the number and the second value being the abbreviation
 */
export const financialNumberSplitter = (value: string): [number | undefined, string | undefined] | undefined => {
  if (value == null || !_.isString(value)) {
    return
  }

  const tokens = value.match(FINANCIAL_NUMBER_SPLITTER_REGEX)

  if (tokens == null || tokens.length === 0 || tokens.length === 1 || tokens.length > 2) {
    return
  }

  return [_.toNumber(tokens?.[0]), tokens?.[1]]
}

/**
 * Parses a  "Financial Number" string into a `number`
 * @param value "Financial Number" string
 * @returns
 */
export const financialNumberParser = (value: string): number | undefined => {
  const financialNumberParts = financialNumberSplitter(value)

  if (financialNumberParts == null || !financialNumberValidate(financialNumberParts)) {
    return
  }

  const [numberPart, abbreviationPart] = financialNumberParts

  return numberPart * FINANCIAL_ABBREVIATION_MAPPING[abbreviationPart]
}

/**
 *
 * @param value
 * @param formatter
 * @returns
 */
export const financialNumberFormatter = (
  value?: number,
  formatter = new Intl.NumberFormat(navigator.language ?? 'en-US'),
): string => {
  if (!isNumber(value)) {
    return 'INVALID'
  }

  return formatter.format(value)
}
