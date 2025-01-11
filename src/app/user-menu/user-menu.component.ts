import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css'
})
export class UserMenuComponent implements OnInit{
  username:string="";
  changeEmailForm:FormGroup;
    seePassword:boolean=false;
    msg:string="";
    openMenu:boolean=false;
  

  constructor(private tokenService:TokenService,private authService:AuthService){
    this.changeEmailForm=new FormGroup({
      email:new FormControl("",[Validators.required,Validators.email]),
      password:new FormControl("",Validators.required)
    });
  }

  ngOnInit(): void {
    this.username=this.tokenService.getUserName();
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

  changeEmail(event:Event):void{
    event.preventDefault();
    let token=this.tokenService.getToken();
    if(token){
      this.authService.changeEmail({
        email:this.changeEmailForm.value.email,
        password:this.changeEmailForm.value.password
      },token).subscribe({
        next:_=>{
          this.setMsg("Email modificado con éxito");
        },
        error:error=>{
          this.setMsg(error.error);
        }
      });
    }

  }

}
