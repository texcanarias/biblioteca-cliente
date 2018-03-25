import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../../environments/environment';

@Injectable()
export class Base {

  protected URLServer: string;

  constructor(http: Http) {
    if (environment.production) {
      this.URLServer = "http://disotm.com";
    }
    else{
      this.URLServer = "http://localhost/biblioteca";
    }
  }

  protected getHeaders() {
    let ApiKey = JSON.parse(sessionStorage.getItem('usuarioEnSession')).apikey;

    var headers = new Headers();
    headers.append('X-API-KEY', ApiKey);
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return headers;
  }

  protected handleError(error: Response | any) {
    throw (error);
  }
}
