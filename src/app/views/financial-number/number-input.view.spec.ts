import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { NumberInputView } from './number-input.view'

describe('FinancialNumberInputView', () => {
  let component: NumberInputView
  let fixture: ComponentFixture<NumberInputView>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // @angular
        NoopAnimationsModule,

        // financial-number
        NumberInputView,
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(NumberInputView)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
