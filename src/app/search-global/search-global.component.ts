import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {QuestionService} from "../services/question.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-search-global',
  templateUrl: './search-global.component.html',
  styleUrls: ['./search-global.component.css']
})
export class SearchGlobalComponent implements OnInit {

  @Input('leftName') leftName
  public typeaheadLoading: boolean;
  public typeaheadNoResults: boolean;

  questions:Observable<any>
  constructor(private qs:QuestionService, private route:ActivatedRoute, private router : Router) { }

  public searchCtrl:FormControl = new FormControl();

  public searchForm:FormGroup = new FormGroup({
    search: this.searchCtrl
  });


  ngOnInit() {
  let slug= this.route.snapshot.params['slug'];

  this.questions =  this.searchCtrl.valueChanges
      .filter(_val => _val && _val.length >= 2)
      .debounceTime(250)
      .flatMap(_val => this.qs.searchQuestion({search:_val, filter:slug ? slug :'all'}))
      .map(_res => _res.questions.map(_r => {
        return {
          title:_r.title,
          slug:_r.slug
        }
      }))
  }

  searchAll(){

  }

  typeaheadOnSelect($event){
    let slug = $event.item.slug
    this.router.navigate([`/questions/${slug}`])
  }

  public changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  public changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
  }

}
