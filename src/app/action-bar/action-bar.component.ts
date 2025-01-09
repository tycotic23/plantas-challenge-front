import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'action-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './action-bar.component.html',
  styleUrl: './action-bar.component.css'
})
export class ActionBarComponent {
  constructor(private tokenService:TokenService){}

  logOut():void{
    this.tokenService.logOut();
  }
}
