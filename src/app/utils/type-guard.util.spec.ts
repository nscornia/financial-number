import { TestCase } from 'test/test.model'
import { EMPTY_VALUES } from '../../../test/fixtures/empty.fixture'
import { FinancialAbbreviation } from './financial-number.model'
import { financialNumberValidate, isFinancialAbbreviation, isNumber } from './type-guard.util'

describe('type-guard.utils', () => {
  describe('isNumber', () => {
    describe('returns false', () => {
      const FALSE_NUMBER_TEST_CASES: TestCase[] = [...EMPTY_VALUES, '1', Infinity, -Infinity, NaN]

      it.each(FALSE_NUMBER_TEST_CASES)('given %p', (val) => {
        expect(isNumber(val)).toEqual(false)
      })
    })

    describe('returns true', () => {
      const TRUE_NUMBER_TEST_CASES: TestCase<number>[] = [
        -1,
        0,
        1,
        Number.MAX_SAFE_INTEGER,
        Number.MAX_VALUE,
        Number.MIN_SAFE_INTEGER,
        Number.MIN_VALUE,
      ]

      it.each(TRUE_NUMBER_TEST_CASES)('given %p', (val) => {
        expect(isNumber(val)).toEqual(true)
      })
    })
  })

  describe('isFinancialAbbreviation', () => {
    describe('returns false', () => {
      const FALSE_FINANCIAL_ABBREVIATION_TEST_CASES: TestCase[] = [...EMPTY_VALUES, 'e', 1, '0', '.', 'ten']

      it.each(FALSE_FINANCIAL_ABBREVIATION_TEST_CASES)('given %p', (val) => {
        expect(isFinancialAbbreviation(val)).toEqual(false)
      })
    })

    describe('returns true', () => {
      const TRUE_FINANCIAL_ABBREVIATION_TEST_CASES: TestCase<FinancialAbbreviation>[] = ['k', 'm', 'b']

      it.each(TRUE_FINANCIAL_ABBREVIATION_TEST_CASES)('given %p', (val) => {
        expect(isFinancialAbbreviation(val)).toEqual(true)
      })
    })
  })

  describe('financialNumberValidate', () => {
    describe('returns false', () => {
      const FALSE_FINANCIAL_NUMBER_VALIDATE_TEST_CASES: TestCase[] = [...EMPTY_VALUES, [1, 2], [1], [123, 0.5, 'k'], []]

      it.each(FALSE_FINANCIAL_NUMBER_VALIDATE_TEST_CASES)('given %p', (val) => {
        expect(financialNumberValidate(val)).toEqual(false)
      })
    })

    describe('returns true', () => {
      const TRUE_FINANCIAL_NUMBER_VALIDATE_TEST_CASES: TestCase<[number, FinancialAbbreviation]>[] = [
        [-0.0001, 'k'],
        [250, 'k'],
        [0, 'm'],
        [10, 'm'],
        [0.5, 'b'],
        [-25000, 'b'],
      ]

      it.each(TRUE_FINANCIAL_NUMBER_VALIDATE_TEST_CASES)('given %p', (...val: [number, FinancialAbbreviation]) => {
        expect(financialNumberValidate(val)).toEqual(true)
      })
    })
  })
})
