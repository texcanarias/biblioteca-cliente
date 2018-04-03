import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import { Biblioteca } from './biblioteca';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Base } from '../base/base.service';

@Injectable()
export class AppBibliotecasService extends Base{

  constructor(private http: Http) {
    super(http);
    this.URLServer = this.URLServer+"/server/index.php/biblioteca_1_0/";
  }

  public getItems() {
    var headers = this.getHeaders();

    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.URLServer + 'bibliotecas', options)
      .toPromise()
      .then(res => <Biblioteca[]>res.json())
      .then(data => {return data;})
      .catch(this.handleError);
  }

  public getItem(IdItem: number){
    var headers = this.getHeaders();

    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.URLServer + 'bibliotecas' + '/' + IdItem, options)
      .toPromise()
      .then(res => <Biblioteca>res.json())
      .then(data => {return data;})
      .catch(this.handleError);    
  }


  public putItem(item: Biblioteca) {
    var headers = this.getHeaders();

    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(item);

    return this.http.put(this.URLServer, body, options)
      .toPromise()
      .then(data => { return data; })
      .catch(this.handleError);
  }

  public postItem(item: Biblioteca) {
    var headers = this.getHeaders();

    let options = new RequestOptions({ headers: headers });

    let body = JSON.stringify(item);

    return this.http.post(this.URLServer, body, options)
      .toPromise()
      .then(data => { return data; })
      .catch(this.handleError);
  }

  public deleteItem(item: Biblioteca) {
    var headers = this.getHeaders();

    let peticion: any = { "id": item.id };

    let body = JSON.stringify(peticion);
    let options = new RequestOptions({ headers: headers, body: body });

    return this.http.delete(this.URLServer+ 'bibliotecas' + '/' , options)
      .toPromise()
      .then(data => { return data; })
      .catch(this.handleError);
  }

}