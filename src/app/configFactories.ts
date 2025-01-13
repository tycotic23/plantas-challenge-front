export class configFactories{
    static baseUrl="http://localhost:8080";
    /* static baseUrl="https://dashboard.render.com/web/srv-cu1jfhl6l47c73a4mgb0"; */
    static expireToken=10800;

}

export enum typeSensors{
    TEMPERATURA="Temperatura",
    PRESION="Presión",
    VIENTO="Viento",
    NIVELES="Niveles",
    ENERGIA="Energía",
    TENSION="Tensión",
    CO2="Monóxido de carbono",
    OTROS="Otros gases"
}