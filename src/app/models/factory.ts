import { Country } from "./country";
import { Sensor } from "./sensor";


export interface Factory{
    id:number;
    country:Country;
    name:string;
    sensors:Sensor[];
}

export interface FactoryCreate{
    country_id:number;
    name:string;
}

export interface FactoryUpdate{
    id:number;
    country_id?:number;
    name?:string;
}

