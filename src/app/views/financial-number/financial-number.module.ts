import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NumberInputView } from './number-input.view'
import { NumberDisplayView } from './number-display.view'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'input', pathMatch: 'full' },
      {
        path: 'input',
        component: NumberInputView,
      },
      {
        path: 'display',
        component: NumberDisplayView,
      },
    ]),
  ],
})
export class FinancialNumberInputViewModule {}
