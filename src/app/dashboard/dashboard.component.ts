import { Component, OnInit } from '@angular/core';
import { ActionBarComponent } from '../action-bar/action-bar.component';
import { CommonModule } from '@angular/common';
import { TokenService } from '../services/token.service';
import { SensorService } from '../services/sensor.service';
import { FactoryService } from '../services/factory.service';
import { MessagesService } from '../message.service';
import { SensorDTO } from '../models/sensor';
import { typeSensors } from '../configFactories';
import { FactoryCreate, FactoryInfoDTO } from '../models/factory';
import { CountryService } from '../services/country.service';
import { Country } from '../models/country';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ActionBarComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  createMode:boolean=false;
  sensorFlat?:SensorDTO;
  sensores?:any;
  types=typeSensors;
  factories:FactoryInfoDTO[]=[];
  countries:Country[]=[];
  createFactoryForm:FormGroup;
  
  constructor(private countryService:CountryService,private messageService:MessagesService,private tokenService:TokenService,private sensorService:SensorService,private factoryService:FactoryService){

    this.createFactoryForm=new FormGroup({
          name:new FormControl("",Validators.required),
          country:new FormControl(Validators.required)
        });
  }

  getInCreate():void{
    this.createMode=true;
  }

  getOutCreate():void{
    this.createMode=false;
    this.createFactoryForm.reset();
  }

  acceptCreate(event:Event):void{
    event.preventDefault();

    //preparar peticion
    let newFactory:FactoryCreate={
      name:this.createFactoryForm.value.name,
      country:this.countries[this.createFactoryForm.value.country].name.common,
      flag:this.countries[this.createFactoryForm.value.country].flags.svg
    };


    //enviar peticion
    let token=this.tokenService.getToken();
    if(token){
      this.factoryService.createFactory(newFactory,token).subscribe({
        next:data=>{
          if(data.body){
            this.factories.push(data.body);
            this.getOutCreate();
          }else{
            this.messageService.setMessage("Hubo un error al crear la planta");
          }
          
        },
        error:error=>{
          this.messageService.setMessage(error.error);
        }
      });
    }
  }

  ngOnInit(): void {
    let token=this.tokenService.getToken();
    if(token){
      //traer informacion de los paneles
      this.getSensorsGroupByType(token);
      this.getAllSensorsFlat(token);
      this.getAllFactories(token);
      this.getAllCountries();
    }
  }

  getSensorsGroupByType(token:string):void{
    this.sensorService.getSensorsGroupByType(token).subscribe({
      next:data=>{
       
        this.sensores=data.body??undefined;
        
      },
      error:error=>{
        this.messageService.setMessage("Error al traer los sensores");
      }
    });
  }

  getAllSensorsFlat(token:string):void{
    this.sensorService.getAllSensorsFlat(token).subscribe({
      next:data=>{
        this.sensorFlat=data.body??undefined;
      },
      error:error=>{
        this.messageService.setMessage("Error al traer los sensores");
      }
    });
  }

  getAllFactories(token:string):void{
    this.factoryService.getAllFactories(token).subscribe({
      next:data=>{
        this.factories=data.body??[];
      },
      error:error=>{
        this.messageService.setMessage("Error al traer las plantas");
      }
    });
  }

  getAllCountries():void{
    this.countryService.getAllCountries().subscribe({
      next:data=>{
        this.countries=data.body??[];
      },
      error:error=>{
        this.messageService.setMessage("Error al traer las plantas");
      }
    });
  }
}
