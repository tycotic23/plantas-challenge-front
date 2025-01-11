import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
registerForm:FormGroup;
  seeCheckPassword:boolean=false;
  seePassword:boolean=false;
  msg:string="";

  constructor(private router:Router,private authService:AuthService,private tokenService:TokenService){
    this.registerForm=new FormGroup({
      email:new FormControl("",[Validators.required,Validators.email]),
      password:new FormControl("",[Validators.required,Validators.minLength(8),Validators.pattern(/(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&])/)]),
      checkpassword:new FormControl("",Validators.required),
      username:new FormControl("",Validators.required),
    });

  }

  tooglePassword():void{
    this.seePassword=!this.seePassword;
  }

  toogleCheckPassword():void{
    this.seeCheckPassword=!this.seeCheckPassword;
  }

  setMsg(msg:string){
    this.msg=msg;
    setTimeout(()=>{
      this.msg="";
    },3000);
  }


  register(event:Event):void{
    event.preventDefault();
    console.log({
      username:this.registerForm.value.username,
      email:this.registerForm.value.email,
      password:this.registerForm.value.password
    })
    this.authService.register({
      username:this.registerForm.value.username,
      email:this.registerForm.value.email,
      password:this.registerForm.value.password
    }).subscribe({
      next:data=>{
        if(!data.body || !data.body.token || data.body.token==""){
          this.setMsg("Email o contraseña inválido");
        }else{
          this.tokenService.setToken(data.body.token);
          this.tokenService.setUserName(data.body.username);
          this.tokenService.autoLogout();
          this.router.navigate(['/dashboard']);
        }
        

      },
      error:error=>{
        this.setMsg(error.error);
      }
    });

  }
}
