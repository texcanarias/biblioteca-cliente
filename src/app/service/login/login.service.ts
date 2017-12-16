import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import { Usuario } from './usuario';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Base } from '../base/base.service';

@Injectable()
export class LoginService extends Base{

  constructor(private http: Http) {     
    super(http);
    this.URLServer = this.URLServer + "/server/index.php/registro_1_0/";
  }

  protected getHeaders() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return headers;
  }

/*
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }*/

  //curl -i -X POST -H "Content-Type: application/json" http://192.168.50.238/server/index.php/registro_1_0/login -d '{"usuario":"admin","pass":"adclick"}'
  public postLogin(usuario: string, password: string) {
    var headers = this.getHeaders();

    let options = new RequestOptions({ headers: headers });
    let Parametros = {'usuario':usuario,'pass':password};
    let body = JSON.stringify(Parametros);

    return this.http.post(this.URLServer+"login", body, options)
      .toPromise()
      .then(res => <Usuario>res.json())
      .then(data => { 
        console.log(data);
        return data; })
      .catch(this.handleErrorRecuperarPass);
  }

  //curl -i -X POST -H "Content-Type: application/json" http://192.168.50.238/server/index.php/registro_1_0/recuperar -d '{"email":"antonio@adclick.es"}'
  public postRecuperarPass(email: string){
    var headers = this.getHeaders();

    let options = new RequestOptions({ headers: headers });
    let Parametros = {'email':email};
    let body = JSON.stringify(Parametros);

    return this.http.post(this.URLServer+"recuperar", body, options)
      .toPromise()
      .then(data => { return data; })
      .catch(this.handleErrorRecuperarPass);
  }

  private handleErrorRecuperarPass(error: Response | any) {
    throw(error._body);
  }

}
