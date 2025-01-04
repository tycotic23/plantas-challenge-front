import { Sensor } from "./sensor";

export interface TypeSensor{
    id:number;
    type:string;
}

export interface TypeSensorGroup{
    id:number;
    type:string;
    sensors:Sensor[];
}
