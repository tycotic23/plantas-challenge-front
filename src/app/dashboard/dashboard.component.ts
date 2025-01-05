import { Component } from '@angular/core';
import { ActionBarComponent } from '../action-bar/action-bar.component';
import { CreateFactoryComponent } from '../create-factory/create-factory.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ActionBarComponent,CreateFactoryComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  createMode:boolean=false;

  constructor(){}

  getInCreate():void{
    this.createMode=true;
  }

  getOutCreate():void{
    this.createMode=false;
  }
}
