import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import { Usuario } from './gestion-usuario';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Base } from '../base/base.service';

@Injectable()
export class GestionUsuarioService extends Base{

  constructor(private http: Http) {
    super(http);
    this.URLServer = this.URLServer + "/server/index.php/registro_1_0/";
  }

  /*private getHeaders() {
    let ApiKey = JSON.parse(sessionStorage.getItem('usuarioEnSession')).apikey;

    var headers = new Headers();
    headers.append('X-API-KEY', ApiKey);
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return headers;
  }

  private handleErrorRecuperarPass(error: Response | any) {
    throw (error);
  }*/


  //curl -i -X PATCH -H "Content-Type: application/json" -H "X-API-KEY: 21232f297a57a5a743894a0e4a801fc3" http://192.168.50.238/server/index.php/registro_1_0/set_nombre_email -d '{"id":"2","nombre":"admin2","email":"antonio.tex@gmail.com"}'
  public patchSetNombreEmail(usuario: Usuario) {
    var headers = this.getHeaders();

    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(usuario);

    return this.http.patch(this.URLServer + "set_nombre_email", body, options)
      .toPromise()
      .then(data => { return data; })
      .catch(this.handleError);
  }

  //curl -i -X PATCH -H "Content-Type: application/json" -H "X-API-KEY: 21232f297a57a5a743894a0e4a801fc3" http://192.168.50.238/server/index.php/registro_1_0/set_pass -d '{"id":"2","password":"123456789"}'
  public patchSetPassword(id: number, password:string) {
    var headers = this.getHeaders();

    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({'id':id,'password':password});

    return this.http.patch(this.URLServer + "set_pass", body, options)
      .toPromise()
      .then(data => { return data; })
      .catch(this.handleError);
  }

}
