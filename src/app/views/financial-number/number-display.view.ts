import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { NumberStateService } from '../../services/financial-number.service'

@Component({
  selector: 'number-display',
  standalone: true,
  imports: [
    // @angular
    CommonModule,
  ],
  templateUrl: './number-display.view.html',
  styleUrls: ['./financial-number.scss', './number-display.view.scss'],
})
export class NumberDisplayView {
  public financialNumberFormatted = this.financialNumberService.financialNumber

  constructor(private financialNumberService: NumberStateService) {}
}
