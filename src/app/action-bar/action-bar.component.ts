import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TokenService } from '../services/token.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'action-bar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './action-bar.component.html',
  styleUrl: './action-bar.component.css'
})
export class ActionBarComponent {
  constructor(private tokenService:TokenService){}

  toggleMenu:boolean=false;

  logOut():void{
    this.tokenService.logOut();
  }
}
