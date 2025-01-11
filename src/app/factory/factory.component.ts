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
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-factory',
  standalone: true,
  imports: [ActionBarComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './factory.component.html',
  styleUrl: './factory.component.css'
})
export class FactoryComponent implements OnInit{

    factories:FactoryInfoDTO[]=[];
    countries:Country[]=[];
    selectedFactory?:FactoryInfoDTO;
    types=typeSensors;
    sensores?:any;
    searchForm:FormGroup;
    filteredFactories:FactoryInfoDTO[]=[];
    
    constructor(private countryService:CountryService,private messageService:MessagesService,private tokenService:TokenService,private sensorService:SensorService,private factoryService:FactoryService){
      this.searchForm=new FormGroup({
            name:new FormControl(""),
            country:new FormControl(null)
          });
    }

  ngOnInit(): void {
    let token=this.tokenService.getToken();
    if(token){
      //traer informacion de los paneles
      this.getAllFactories(token);
      this.getAllCountries();
    }
  }

  listenerEscape(event:KeyboardEvent){
    if(event.key=="Escape"){
      this.resetFilter();
    }
  }

  resetFilter():void{
    this.filteredFactories=this.factories;
    this.searchForm.reset();
  }

  search(event:Event):void{
    event.preventDefault();
    this.filteredFactories=this.factories.filter(f=>{
      return (!this.searchForm.value.name || f.name.toLowerCase().includes(this.searchForm.value.name.toLowerCase()))
      && (!this.searchForm.value.country || this.searchForm.value.country=="null"  || f.country.toLowerCase().includes(this.searchForm.value.country.toLowerCase()))
    });
  }

  getAllFactories(token:string):void{
    this.factoryService.getAllFactories(token).subscribe({
      next:data=>{
        this.factories=data.body??[];
        this.filteredFactories=this.factories;
      },
      error:error=>{
        this.messageService.setMessage("Error al traer las plantas");
      }
    });
  }

  btnToggleSensor(type:typeSensors):void{
    if(this.sensores[type].disabled==1){
      this.enableSensor(type);
    }else{
      this.disableSensor(type);
    }
  }

  disableSensor(type:typeSensors):void{
    let token=this.tokenService.getToken();
    if(token && this.selectedFactory){
      this.sensorService.disableSensor(token,this.selectedFactory.id,type).subscribe({
        next:data=>{
          this.messageService.setMessage("Sensor deshabilitado");
          this.sensores[type].disabled=1;
        },
        error:error=>{
          this.messageService.setMessage("Error al deshabilitar el sensor");
        }
      });
    }
  }

  enableSensor(type:typeSensors):void{
    let token=this.tokenService.getToken();
    if(token && this.selectedFactory){
      this.sensorService.enableSensor(token,this.selectedFactory.id,type).subscribe({
        next:data=>{
          this.messageService.setMessage("Sensor habilitado nuevamente");
          this.sensores[type].disabled=0;
        },
        error:error=>{
          this.messageService.setMessage("Error al habilitar el sensor");
        }
      });
    }
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
