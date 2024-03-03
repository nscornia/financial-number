import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./views/financial-number/financial-number.module').then((m) => m.FinancialNumberInputViewModule),
  },
]
