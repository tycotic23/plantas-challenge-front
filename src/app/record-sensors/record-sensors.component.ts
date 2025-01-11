import { Component, OnInit } from '@angular/core';
import { ActionBarComponent } from '../action-bar/action-bar.component';
import { CommonModule } from '@angular/common';
import { MessagesService } from '../message.service';
import { TokenService } from '../services/token.service';
import { RecordSensorsService } from '../services/record-sensors.service';
import { Record } from '../models/record';
import { UserMenuComponent } from '../user-menu/user-menu.component';

@Component({
  selector: 'app-record-sensors',
  standalone: true,
  imports: [ActionBarComponent,CommonModule,UserMenuComponent],
  templateUrl: './record-sensors.component.html',
  styleUrl: './record-sensors.component.css'
})
export class RecordSensorsComponent implements OnInit{

  recordFactories:Record[]=[];

  constructor(private messageService:MessagesService,private tokenService:TokenService,private recordSensorsService:RecordSensorsService){}

  ngOnInit(): void {
    let token=this.tokenService.getToken();
    if(token){
      this.getAllRecordFactories(token);
    }
  }

  getAllRecordFactories(token:string){
    this.recordSensorsService.getAllRecordSensors(token).subscribe({
      next:data=>{
        this.recordFactories=data.body??[];
      },
      error:error=>{
        this.messageService.setMessage(error.error);
      }
    });
  }

}
