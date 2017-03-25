import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class NeedToLoginService {

  private needLoginPublisher : BehaviorSubject<boolean>
  constructor() {
    this.needLoginPublisher = new BehaviorSubject(false)
  }

  needLogin():Observable<boolean>{
    return this.needLoginPublisher.asObservable()
  }

  showLogin(){
    console.log('Need to login')
    this.needLoginPublisher.next(true)
  }

}
