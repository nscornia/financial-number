import { FormControl } from '@angular/forms'
import { TestCase } from 'test/test.model'
import * as td from 'testdouble'
import { EMPTY_VALUES } from '../../../test/fixtures/empty.fixture'
import { forceAssign } from '../../../test/test.util'
import {
  NOT_FINANCIAL_NUMBER_ERROR,
  financialNumberFormatter,
  financialNumberParser,
  financialNumberSplitter,
  financialNumberValidatorFn,
} from './financial-number.utils'

describe('financial-number.utils', () => {
  describe('financialNumberValidatorFn', () => {
    const mockFormControl = td.instance(FormControl<string>)

    describe('returns Angular validator error (invalid)', () => {
      const FALSE_VALIDATOR_TEST_CASES: TestCase[] = [...EMPTY_VALUES]

      it.each(FALSE_VALIDATOR_TEST_CASES)('given %p', (val) => {
        forceAssign(mockFormControl, 'value', val)
        expect(financialNumberValidatorFn(mockFormControl)).toEqual(NOT_FINANCIAL_NUMBER_ERROR)
      })
    })

    describe('returns `null` (valid)', () => {
      const TRUE_VALIDATOR_TEST_CASES: TestCase<string>[] = ['-0.0001k', '250k', '0m', '10m', '0.5b', '-25000b']

      it.each(TRUE_VALIDATOR_TEST_CASES)('given %p', (val) => {
        forceAssign(mockFormControl, 'value', val)
        expect(financialNumberValidatorFn(mockFormControl)).toEqual(null)
      })
    })
  })

  describe('financialNumberSplitter', () => {
    describe('undefined', () => {
      const UNDEFINED_SPLITTER_TEST_CASES: TestCase[] = [null, undefined, NaN, [], {}]

      it.each(UNDEFINED_SPLITTER_TEST_CASES)('given %p', (val) => {
        expect(financialNumberSplitter(val)).toEqual(undefined)
      })
    })

    // describe('invalid tuple', () => {
    //   const INVALID_SPLITTER_TEST_CASES: TestCase[] = ['']

    //   it.each(INVALID_SPLITTER_TEST_CASES)('given %p', (val) => {
    //     expect(financialNumberSplitter(val)).toEqual(td.matchers.isNumber())
    //   })
    // })

    describe('returns valid tokens', () => {
      const VALID_SPLITTER_TEST_CASES: TestCase<[[number, string], string]>[] = [
        [[-0.0001, 'k'], '-0.0001k'],
        [[250, 'k'], '250k'],
        [[0, 'm'], '0m'],
        [[10, 'm'], '10m'],
        [[0.5, 'b'], '0.5b'],
        [[-25000, 'b'], '-25000b'],
      ]

      it.each(VALID_SPLITTER_TEST_CASES)('%p, given %p', (expected: any, input: any) => {
        expect(financialNumberSplitter(input)).toEqual(expected)
      })
    })
  })

  describe('financialNumberParser', () => {
    describe('undefined', () => {
      const UNDEFINED_PARSER_TEST_CASES: TestCase[] = [...EMPTY_VALUES]

      it.each(UNDEFINED_PARSER_TEST_CASES)('given %p', (val) => {
        expect(financialNumberParser(val)).toEqual(undefined)
      })
    })

    describe('returns valid number', () => {
      const VALID_PARSER_TEST_CASES: TestCase<[number, string]>[] = [
        [-0.1, '-0.0001k'],
        [250000, '250k'],
        [0, '0m'],
        [10000000, '10m'],
        [500000000, '0.5b'],
        [-25000000000000, '-25000b'],
      ]

      it.each(VALID_PARSER_TEST_CASES)('%p, given %p', (expected: any, input: any) => {
        expect(financialNumberParser(input)).toEqual(expected)
      })
    })
  })

  describe('financialNumberFormatter', () => {
    const testFormatter = new Intl.NumberFormat('en-US')

    describe('INVALID', () => {
      const INVALID_FORMATTER_TEST_CASES: TestCase[] = [...EMPTY_VALUES]

      it.each(INVALID_FORMATTER_TEST_CASES)('given %p', (val) => {
        expect(financialNumberFormatter(val, testFormatter)).toEqual('INVALID')
      })
    })

    describe('returns formatted number as a string', () => {
      const VALID_FORMATTER_TEST_CASES: TestCase<[string, number]>[] = [
        ['-0.1', -0.1],
        ['250,000', 250000],
        ['0', 0],
        ['10,000,000', 10000000],
        ['500,000,000', 500000000],
        ['-25,000,000,000,000', -25000000000000],
      ]

      it.each(VALID_FORMATTER_TEST_CASES)('%p, given %p', (expected: any, input: any) => {
        expect(financialNumberFormatter(input, testFormatter)).toEqual(expected)
      })
    })
  })
})
