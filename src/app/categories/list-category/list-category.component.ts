import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CategoryService} from "../../services/category.service";
import {QuestionService} from "../../services/question.service";
import {slideInDownAnimation} from "../../animations";

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryQuestions implements OnInit {
  /** Animations*/


  /** Animations*/


  category
  noAnswerQuestions=[]
  popularQuestions=[]
  newQuestions=[]

  newQuestionsMeta;
  popularQuestionsMeta;
  noAnswerQuestionsMeta;

  constructor(private route:ActivatedRoute, private qs:QuestionService) { }

  ngOnInit() {
    this.route.params.subscribe(_p => {
      let slug = _p['slug']
      this.getQuestions(slug);
      this.getQuestions(slug,'popularQuestions');
      this.getQuestions(slug,'noAnswerQuestions');

    })
  }

  private getQuestions(slug,collection = 'newQuestions', skip = 0) {
    if (collection == 'popularQuestions') {
      this.qs.getQuestionsByCategory({orderBy: 'showCount',skip, slug})
        .subscribe(_res => {
          this.popularQuestions = _res.questions;
          this.popularQuestionsMeta = _res.meta;
        })
    }

    if (collection == 'noAnswerQuestions') {
      this.qs.getQuestionsByCategory({orderBy: 'answers',skip, slug})
        .subscribe(_res => {
          this.noAnswerQuestions = _res.questions;
          this.noAnswerQuestionsMeta = _res.meta;
        })
    }
    else {
      this.qs.getQuestionsByCategory({orderBy: 'createdAt',skip, slug})
        .subscribe(_res => {
          console.log(_res)
          this.category = _res.category;
          this.newQuestions = _res.questions;
          this.newQuestionsMeta = _res.meta;
        })
    }

  }

  paginate($event) {
    let slug = this.route.snapshot.params['slug']
    this.getQuestions(slug,$event.collection , $event.skip)
    console.log("in category tabs : skip : ", $event)
  }

}
