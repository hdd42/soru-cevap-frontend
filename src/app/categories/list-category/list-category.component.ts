import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CategoryService} from "../../services/category.service";
import {QuestionService} from "../../services/question.service";

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryQuestions implements OnInit {

  category
  noAnswerQuestions=[]
  popularQuestions=[]
  newQuestions=[]

  constructor(private route:ActivatedRoute, private qs:QuestionService) { }

  ngOnInit() {
    this.route.params.subscribe(_p => {
      let slug = _p['slug']
      this.qs.getQuestionsByCategory(slug)
        .subscribe(_res => {
          console.log(_res)
          this.category = _res.category;
          this.newQuestions = _res.questions;
        })

      this.qs.getQuestionsByCategory(slug,'answers')
        .subscribe(_res => {
          this.noAnswerQuestions = _res.questions;
        })

      this.qs.getQuestionsByCategory(slug,'showCount')
        .subscribe(_res => {
          this.popularQuestions = _res.questions;
        })
    })
  }

}
