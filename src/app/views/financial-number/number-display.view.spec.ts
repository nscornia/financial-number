import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { NumberDisplayView } from './number-display.view'

describe('FinancialNumberDisplayView', () => {
  let component: NumberDisplayView
  let fixture: ComponentFixture<NumberDisplayView>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // @angular
        NoopAnimationsModule,

        // financial-number
        NumberDisplayView,
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(NumberDisplayView)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
