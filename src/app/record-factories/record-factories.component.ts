import { Component, OnInit } from '@angular/core';
import { ActionBarComponent } from '../action-bar/action-bar.component';
import { RecordFactoriesService } from '../services/record-factories.service';
import { TokenService } from '../services/token.service';
import { MessagesService } from '../message.service';
import { Record } from '../models/record';
import { CommonModule } from '@angular/common';
import { UserMenuComponent } from '../user-menu/user-menu.component';

@Component({
  selector: 'app-record-factories',
  standalone: true,
  imports: [ActionBarComponent,CommonModule,UserMenuComponent],
  templateUrl: './record-factories.component.html',
  styleUrl: './record-factories.component.css'
})
export class RecordFactoriesComponent implements OnInit{

  recordFactories:Record[]=[];

  constructor(private messageService:MessagesService,private tokenService:TokenService,private recordFactoriesService:RecordFactoriesService){}

  ngOnInit(): void {
    let token=this.tokenService.getToken();
    if(token){
      this.getAllRecordFactories(token);
    }
  }

  getAllRecordFactories(token:string){
    this.recordFactoriesService.getAllRecordFactories(token).subscribe({
      next:data=>{
        this.recordFactories=data.body??[];
      },
      error:error=>{
        this.messageService.setMessage(error.error);
      }
    });
  }

}
