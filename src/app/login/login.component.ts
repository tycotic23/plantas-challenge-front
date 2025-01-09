import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

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
  msg:string="";

  constructor(private router:Router,private authService:AuthService,private tokenService:TokenService){
    this.loginForm=new FormGroup({
      email:new FormControl("",[Validators.required,Validators.email]),
      password:new FormControl("",Validators.required)
    });

  }

  tooglePassword():void{
    this.seePassword=!this.seePassword;
  }

  setMsg(msg:string){
    this.msg=msg;
    setTimeout(()=>{
      this.msg="";
    },3000);
  }


  login(event:Event):void{
    event.preventDefault();
    this.authService.login({
      email:this.loginForm.value.email,
      password:this.loginForm.value.password
    }).subscribe({
      next:data=>{
        if(!data.body || !data.body.token || data.body.token==""){
          this.setMsg("Email o contraseña incorrectos");
        }else{
          this.tokenService.setToken(data.body.token);
          this.tokenService.setUserName(data.body.username);
          this.tokenService.autoLogout();
          this.router.navigate(['/dashboard']);
        }
        

      },
      error:error=>{
        this.setMsg("Email o contraseña incorrectos");
      }
    });




    
  }
}
