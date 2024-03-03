import { CommonModule, NgIf } from '@angular/common'
import { Component } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators'
import { NumberStateService } from '../../services/financial-number.service'
import { financialNumberValidatorFn } from '../../utils/financial-number.utils'

@Component({
  selector: 'number-input',
  standalone: true,
  imports: [
    // @angular
    CommonModule,
    ReactiveFormsModule,
    NgIf,

    // @angular/material
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './number-input.view.html',
  styleUrls: ['./financial-number.scss', './number-input.view.scss'],
})
export class NumberInputView {
  public financialInputControl: FormControl = new FormControl(this.financialNumberService.rawNumber, [
    financialNumberValidatorFn,
  ])

  constructor(private financialNumberService: NumberStateService) {
    this.financialInputControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        tap((value: string) => {
          this.financialNumberService.financialNumber = value
        }),
      )
      .subscribe()
  }
}
