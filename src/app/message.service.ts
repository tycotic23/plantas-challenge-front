import { Injectable, OnDestroy } from '@angular/core';


export interface PopUp{
  message:string;
  title:string;
  primaryAction:Function;
  secondaryAction:Function;
  primaryLabel:string;
  secondaryLabel:string;
  conditional?:string;
}

@Injectable({
  providedIn: 'root'
})

export class MessagesService implements OnDestroy{
  popUp?:PopUp;
  idTimeMsg?:any;
  private message:string="";

  constructor() { }

  getMessage():string{
    return this.message;
  }



  setMessage(m:string){
    this.message=m;
    if(this.idTimeMsg){
      clearTimeout(this.idTimeMsg);
    }
    this.idTimeMsg=setTimeout(()=>{
      /* quitar el mensaje */
      this.message='';
    },5000);
    
    
  }

  deleteMessage(){
    this.message="";
    if(this.idTimeMsg){
      clearTimeout(this.idTimeMsg);
    }
  }

  ngOnDestroy(): void {
    if(this.idTimeMsg){
      clearTimeout(this.idTimeMsg);
    }
  }


}