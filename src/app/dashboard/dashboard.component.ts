import { Component, OnInit } from '@angular/core';
import { ActionBarComponent } from '../action-bar/action-bar.component';
import { CommonModule } from '@angular/common';
import { TokenService } from '../services/token.service';
import { SensorService } from '../services/sensor.service';
import { FactoryService } from '../services/factory.service';
import { MessagesService } from '../message.service';
import { SensorDTO, SensorUpdate } from '../models/sensor';
import { typeSensors } from '../configFactories';
import { FactoryCreate, FactoryInfoDTO } from '../models/factory';
import { CountryService } from '../services/country.service';
import { Country } from '../models/country';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserMenuComponent } from '../user-menu/user-menu.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ActionBarComponent,CommonModule,ReactiveFormsModule,UserMenuComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  createMode:number=0;
  sensorFlat?:SensorDTO;
  sensores?:any;
  types=typeSensors;
  factories:FactoryInfoDTO[]=[];
  countries:Country[]=[];
  createFactoryForm:FormGroup;
  editFactoryForm:FormGroup;
  editFactory?:FactoryInfoDTO;
  
  constructor(private countryService:CountryService,private messageService:MessagesService,private tokenService:TokenService,private sensorService:SensorService,private factoryService:FactoryService){

    this.createFactoryForm=new FormGroup({
      name:new FormControl("",Validators.required),
      country:new FormControl(null,Validators.required)
    });

    this.editFactoryForm=new FormGroup({
      name:new FormControl("",Validators.required),
      country:new FormControl("",Validators.required),
      type:new FormControl(null,Validators.required),
      readings:new FormControl(0,Validators.required),
      red_alerts:new FormControl(0,Validators.required),
      medium_alerts:new FormControl(0,Validators.required)
    });

    this.editFactoryForm.controls['name'].disable();
    this.editFactoryForm.controls['country'].disable();



    
  }

  createFormReset():void{
    this.createFactoryForm=new FormGroup({
      name:new FormControl("",Validators.required),
      country:new FormControl(null,Validators.required)
    });
  }

  editFormReset():void{
    this.editFactoryForm=new FormGroup({
      name:new FormControl("",Validators.required),
      country:new FormControl("",Validators.required),
      type:new FormControl(null,Validators.required),
      readings:new FormControl(0,Validators.required),
      red_alerts:new FormControl(0,Validators.required),
      medium_alerts:new FormControl(0,Validators.required)
    });

  }

  getInCreate():void{
    this.createMode=1;
  }

  getOutCreate():void{
    this.createMode=0;
    this.createFormReset();
    
  }

  getInEdit(id:number):void{
    this.createMode=2;
    this.editFactory=this.factories.find(f=>f.id==id)??undefined;
    this.editFactoryForm.controls['country'].setValue(this.editFactory?.country);
    this.editFactoryForm.controls['name'].setValue(this.editFactory?.name);
  }

  getOutEdit():void{
    this.createMode=0;
    this.editFormReset();
    this.editFactory=undefined;
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
            this.messageService.setMessage("Planta creada con éxito");
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

  deleteFactory(id:number){
    let token=this.tokenService.getToken();
    if(token){
      this.factoryService.deleteFactory(id,token).subscribe({
        next:_=>{
          //quitar la planta de la lista
          this.factories=this.factories.filter(f=>f.id!=id);
          this.messageService.setMessage("Planta eliminada");
          //volver a cargar los demás datos
          this.getSensorsGroupByType(token);
          this.getAllSensorsFlat(token);
        },
        error:error=>{
          this.messageService.setMessage(error.error);
        }
      });
    }
  }

  acceptEdit(event:Event):void{
    event.preventDefault();

    if(this.editFactory){
        //preparar peticion
        let newSensor:SensorUpdate={
          factory_id:this.editFactory.id,
          type:this.editFactoryForm.value.type,
          medium_alerts:this.editFactoryForm.value.medium_alerts,
          readings:this.editFactoryForm.value.readings,
          red_alerts:this.editFactoryForm.value.red_alerts
        };

        //enviar peticion
        let token=this.tokenService.getToken();
        if(token){
          this.sensorService.createSensor(token,newSensor).subscribe({
            next:data=>{
              if(data.body && this.editFactory){
                //volver a cargar los datos
                this.getSensorsGroupByType(token);
                this.getAllSensorsFlat(token);
                this.getAllFactories(token);
                this.messageService.setMessage("Planta modificada con éxito");
                //salir del modo de edición
                this.getOutEdit();
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
