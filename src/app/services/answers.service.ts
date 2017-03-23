import {Inject, Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class AnswerService {

  constructor(private http:Http,@Inject('Api') private api) {

  }

  addAnswer(id, answer) : Observable<any>{
      let url = `${this.api}/questions/${id}/answers`

    return this.http.post(url , answer)
      .map(_res => _res.json())
  }

}
