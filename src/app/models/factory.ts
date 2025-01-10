
import { Sensor } from "./sensor";


export interface Factory{
    id:number;
    country:string;
    name:string;
    sensors:Sensor[];
    flag:string;
}

export interface FactoryCreate{
    country:string;
    name:string;
    flag:string;
}

export interface FactoryUpdate{
    id:number;
    country?:string;
    name?:string;
    flag?:string;
}

export interface FactoryInfoDTO{
    id:number;
    country:string;
    name:string;
    flag:string;
    readings:number;
    medium_alerts:number;
    red_alerts:number;
}

