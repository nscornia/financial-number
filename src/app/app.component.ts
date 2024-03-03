import { Component } from '@angular/core'
import { MatTabsModule } from '@angular/material/tabs'
import { RouterModule, RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, MatTabsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public routes = [
    { title: 'Number Input View', path: 'input' },
    { title: 'Number Display View', path: 'display' },
  ]
}
