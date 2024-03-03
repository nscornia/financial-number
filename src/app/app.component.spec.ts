import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // @angular
        NoopAnimationsModule,

        // financial-number
        AppComponent,

        // testing modules
        RouterTestingModule,
      ],
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })
})
