import { TestBed } from '@angular/core/testing'

import { NumberStateService } from './financial-number.service'

describe('FinancialNumberService', () => {
  let service: NumberStateService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(NumberStateService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
