import {Injectable, Inject} from '@angular/core';
import {Http} from "@angular/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class AuthService {
  isLoginPublisher = new BehaviorSubject<boolean>(this.getLocalData('token'))
  userPublisher = new BehaviorSubject<boolean>(this.getLocalData('user'))

  constructor(private http:Http , @Inject('Auth') private auth) {

  }

  login(email:string,password:string) :Observable<boolean>{
      let url = `${this.auth}/login`;
     return this.http.post(url,{email,password})
       .map(_res => _res.json())
       .map(_res => {
        let success = _res.success;
        let message= _res.message
         console.log("succ : ",)
         if(success && message.token){
            this.saveToLocal('token',message.token)
            this.saveToLocal('user',message.user)
            this.isLoginPublisher.next(true);
            this.userPublisher.next(message.user);
           return true
         }
         return false
       })
  }

  register(email:string,password:string,password2:string,name) :Observable<boolean>{
    let url = `${this.auth}/register`;
    return this.http.post(url,{email,password,password2,name})
      .map(_res => _res.json())
      .map(_res => {
        let success = _res.success;
        console.log("succ : ",success)
        if(success){
          return true
        }
        return false
      })
  }


  isLoggedIn() : Observable<boolean> {
    return this.isLoginPublisher.asObservable();
  }

  isLoggedInCurrent() : boolean {
    return this.isLoginPublisher.getValue();
  }

  getUser(): Observable<any>{
    return this.userPublisher.asObservable()
  }

  private saveToLocal(name, data){
    localStorage.setItem(name,JSON.stringify(data))
  }

  logout(){
    localStorage.removeItem('token');
    this.isLoginPublisher.next(false)
  }

  private getLocalData(name) : boolean {
    if(name =='token') return !!localStorage.getItem('token');

    let user = localStorage.getItem('user')
    if(user){
      return JSON.parse(user)
    }
    return null

  }
}
