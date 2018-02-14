import { Injectable } from '@angular/core';

import { Http, Response, Headers, Request, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Base } from '../base/base.service';

@Injectable()
export class AppFamiliaService extends Base{

  constructor(private http: Http) {
    super(http);
   }

   public getItems() {
    /*var headers = this.getHeaders();

    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.URLServer + 'proveedores', options)
      .toPromise()
      .then(res => <Proveedor[]>res.json())
      .then(data => {return data;})
      .catch(this.handleError);*/

    
  }

}
