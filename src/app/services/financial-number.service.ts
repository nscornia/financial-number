import { Injectable } from '@angular/core'
import { financialNumberFormatter, financialNumberParser } from '../utils/financial-number.utils'
import { isNumber } from '../utils/type-guard.util'

@Injectable({ providedIn: 'root' })
export class NumberStateService {
  private _rawNumber = '123m'
  public get rawNumber(): string {
    return this._rawNumber
  }

  private _financialNumber = financialNumberFormatter(financialNumberParser(this.rawNumber))
  public get financialNumber(): string {
    return this._financialNumber
  }

  public set financialNumber(value: string) {
    if (value === this.rawNumber) {
      return
    }

    const parsedNumber = financialNumberParser(value)

    if (isNumber(parsedNumber)) {
      this._rawNumber = value
    }

    this._financialNumber = financialNumberFormatter(parsedNumber)
  }

  public formatter = new Intl.NumberFormat(navigator.language ?? 'en-US')

  constructor() {}
}
