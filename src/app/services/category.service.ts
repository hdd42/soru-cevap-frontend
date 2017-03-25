import {Injectable, Inject} from '@angular/core';
import {Http, URLSearchParams, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class CategoryService {

  constructor(private http:Http , @Inject('Api') private api) {

  }

  getCategories() : Observable<any>{
   let url = `${this.api}/categories`
   return this.http.get(url)
      .map(_res => _res.json())
  }

  searchCategories(searchTerm:string) : Observable<any>{
    const searchParams = new URLSearchParams();
    searchParams.set('search', searchTerm);
    const options = new RequestOptions({ search: searchParams });
    let url = `${this.api}/categories/search`;
    return this.http.get(url, options)
      .map(_res => _res.json())

  }

  getCategoryBySlug(slug,orderBy='createdAt', filter="") : Observable<any>{

    let url = `${this.api}/categories/slug/${slug}`
    return this.http.get(url)
      .map(_res => _res.json())
  }

  addCategory(cat) : Observable<any>{

    let url = `${this.api}/categories/`
    return this.http.post(url,cat)
      .map(_res => _res.json())
  }
}
