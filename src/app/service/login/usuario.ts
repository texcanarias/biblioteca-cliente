export interface Usuario{
    id?:number;
    usuario?:string;
    nombre?:string;
    tipo?:number;
    email?:string;
    apikey?:string; //Apikey necesaria para las conexiones con el sistema de persistencia
}