import { Component } from '@angular/core';
import { ActionBarComponent } from '../action-bar/action-bar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ActionBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
