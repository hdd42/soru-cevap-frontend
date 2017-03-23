import {Injectable, Injector} from '@angular/core';
import {RequestOptions, BaseRequestOptions, RequestOptionsArgs, Headers} from '@angular/http';



@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {

  constructor() {
    super();
  }

  merge(options?:RequestOptionsArgs):RequestOptions {

    let headers ;
    if(options.headers){
      headers = options.headers
    }
    else{
      headers ={}
      headers['Content-Type'] = 'application/json'
      headers['X-App-Secret'] = 'X-App-Secret'
      headers['X-App-Key'] = 'X-App-Key'
    }
    if(localStorage.getItem('token')){
      headers['x-access-token']= `${JSON.parse(localStorage.getItem('token'))}`
    }

    options.headers = headers;
    return super.merge(options);
  }

}

export const requestOptionsProvider = { provide: RequestOptions, useClass: DefaultRequestOptions };

