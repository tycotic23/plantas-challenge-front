import { TypeSensor } from "./type-sensor";

export interface Sensor{
    id:number;
    type:TypeSensor;
    readings:number;
    medium_alerts:number;
    red_alerts:number;
    disabled_sensors:number;
}


export interface SensorCreate{
    type_id:number;
    factory_id:number;
    readings:number;
    medium_alerts:number;
    red_alerts:number;
    disabled_sensors:number;
}

export interface SensorUpdate{
    type_id:number;
    factory_id:number;
    readings?:number;
    medium_alerts?:number;
    red_alerts?:number;
    disabled_sensors?:number;
}


export interface SensorDTO{
    id:number;
    type:string;
    readings:number;
    medium_alerts:number;
    red_alerts:number;
    disabled_sensors:number;
}
