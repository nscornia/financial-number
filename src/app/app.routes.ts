import { Routes } from '@angular/router'

export const routes: Routes = [
  // { path: '', redirectTo: 'input', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('./views/financial-number/financial-number.module').then((m) => m.FinancialNumberInputViewModule),
  },
]
