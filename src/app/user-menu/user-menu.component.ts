import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css'
})
export class UserMenuComponent implements OnInit{
  username:string="";

  constructor(private tokenService:TokenService){}

  ngOnInit(): void {
    this.username=this.tokenService.getUserName();
  }

}
