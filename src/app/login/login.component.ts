import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm:FormGroup;
  seePassword:boolean=false;

  constructor(private router:Router){
    this.loginForm=new FormGroup({
      email:new FormControl("",[Validators.required,Validators.email]),
      password:new FormControl("",Validators.required)
    });

  }

  tooglePassword():void{
    this.seePassword=!this.seePassword;
  }


  login(event:Event):void{
    event.preventDefault();
    this.router.navigate(['/dashboard']);
  }
}
