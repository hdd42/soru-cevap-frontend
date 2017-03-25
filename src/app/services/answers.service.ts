import {Inject, Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {NeedToLoginService} from "./need-to-login.service";

@Injectable()
export class AnswerService {

  constructor(private http:Http,@Inject('Api') private api , private esL:NeedToLoginService) {

  }

  addAnswer(id, answer) : Observable<any>{
      let url = `${this.api}/questions/${id}/answers`

    return this.http.post(url , answer)
      .map(_res => _res.json())
  }

  questionSolved(id):Observable<any>{
    let url =`${this.api}/answers/${id}/solved`
    return this.http.put(url,{})
      .map(_res => _res.json().message)
  }

  upVote(id) : Observable<any>{
    let url =`${this.api}/answers/${id}/vote`
    return this.http.put(url,{vote:'up'})
      .map(_res => _res.json())
  }

  downVote(id) : Observable<any>{
    let url =`${this.api}/answers/${id}/vote`
    return this.http.put(url,{vote:'down'})
      .map(_res => _res.json())
  }

  errorHandler(err) :Observable<any>{
    if(err.status == 401){
      this.esL.showLogin()
    }else{
      return err.json()
    }
  }
}
