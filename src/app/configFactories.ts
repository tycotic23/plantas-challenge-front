export class configFactories{
    /* static baseUrl="http://localhost:8080"; */
    static baseUrl="https://plantas-challenge-api.onrender.com";
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