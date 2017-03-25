import {Inject, Injectable} from '@angular/core';
import {Http, URLSearchParams, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class QuestionService {

  constructor(private http:Http , @Inject('Api') private api) {

  }

  getQuestions({orderBy='createdAt', filter='', skip=0}):Observable<any>{
    const filterParams = new URLSearchParams();
    filterParams.set('orderBy', orderBy);
    filterParams.set('skip', skip.toString());
    if(filter){
      //add filters
    }
    const options = new RequestOptions({ search: filterParams });

    let url = `${this.api}/questions`
    return this.http.get(url,options).map(_res => _res.json())
  }

  getQuestionsByCategory(slug,orderBy='createdAt',filter=''):Observable<any>{
    const filterParams = new URLSearchParams();
    filterParams.set('orderBy', orderBy);
    if(filter){
      //add filters
    }
    const options = new RequestOptions({ search: filterParams });
    let url = `${this.api}/categories/${slug}/questions`
    return this.http.get(url,options).map(_res => _res.json())
  }

  getQuestionBySlug(slug):Observable<any>{
    let url = `${this.api}/questions/slug/${slug}`
    return this.http.get(url).map(_res => _res.json())
  }


  addQuestions(question):Observable<any>{
    let url = `${this.api}/questions`
    return this.http.post(url,question).map(_res=>_res.json())
  }

  upVote(_id) : Observable<any>{
    let url = `${this.api}/questions/${_id}/vote`
    return this.http.put(url,{vote:"up"})
      .map(_res => _res.json())
  }

  downVote(_id) : Observable<any>{
    let url = `${this.api}/questions/${_id}/vote`
    return this.http.put(url,{vote:"down"})
      .map(_res => _res.json())
  }

  searchQuestion({filter='all', search}) :Observable<any>{
    const searchParams = new URLSearchParams();
    searchParams.set('search',search);
    searchParams.set('filter',filter);

    const options = new RequestOptions({ search: searchParams });

    let url = `${this.api}/questions/search`
    return this.http.get(url,options)
      .map(_res=> _res.json())
  }

}
