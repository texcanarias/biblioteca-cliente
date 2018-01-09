export interface Usuario{
    id?:number;
    usuario?:string;
    nombre?:string;
    tipo?:number;
    email?:string;
    apikey?:string; //Apikey necesaria para verificar la petición del webservice
}