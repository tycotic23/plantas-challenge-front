import { Component, OnInit } from '@angular/core';
import { ActionBarComponent } from '../action-bar/action-bar.component';
import { FactoryService } from '../services/factory.service';
import { SensorService } from '../services/sensor.service';
import { TokenService } from '../services/token.service';
import { MessagesService } from '../message.service';
import { CountryService } from '../services/country.service';
import { Country } from '../models/country';
import { FactoryInfoDTO } from '../models/factory';
import { CommonModule } from '@angular/common';
import { typeSensors } from '../configFactories';
import { Sensor } from '../models/sensor';

@Component({
  selector: 'app-factory',
  standalone: true,
  imports: [ActionBarComponent,CommonModule],
  templateUrl: './factory.component.html',
  styleUrl: './factory.component.css'
})
export class FactoryComponent implements OnInit{

    factories:FactoryInfoDTO[]=[];
    countries:Country[]=[];
    selectedFactory?:FactoryInfoDTO;
    types=typeSensors;
    sensores?:any;
    
    constructor(private countryService:CountryService,private messageService:MessagesService,private tokenService:TokenService,private sensorService:SensorService,private factoryService:FactoryService){}

  ngOnInit(): void {
    let token=this.tokenService.getToken();
    if(token){
      //traer informacion de los paneles
      this.getAllFactories(token);
      this.getAllCountries();
    }
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

  selectFactory(id:number):void{
    //si esta planta ya esta seleccionada entonces deseleccionarla
    if(this.selectedFactory && this.selectedFactory.id==id){
      this.selectedFactory=undefined;
      this.sensores=undefined;
    }else{
      //seleccionar planta
      this.selectedFactory=this.factories.find(f=>f.id==id);
      //obtener sus sensores actualizados
      let token=this.tokenService.getToken();
      if(token){
        this.getSensorsGroupByType(token);
      }
      
    
    }

  }

  getSensorsGroupByType(token:string):void{
    if(this.selectedFactory){
      this.factoryService.getFactorySensors(token,this.selectedFactory.id).subscribe({
        next:data=>{
         
          this.sensores=data.body??undefined;
          
        },
        error:error=>{
          this.messageService.setMessage("Error al traer los sensores");
        }
      });
    }
    
  }

  

}
