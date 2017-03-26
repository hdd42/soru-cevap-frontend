import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {QuestionService} from "../services/question.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  noAnswerQuestions = []
  popularQuestions = []
  newQuestions = []

  newQuestionsMeta;
  popularQuestionsMeta;
  noAnswerQuestionsMeta;


  constructor(private qs: QuestionService) {
  }

  ngOnInit() {
    this.getQuestions();
    this.getQuestions('popularQuestions');
    this.getQuestions('noAnswerQuestions');
  }

  private getQuestions(collection = 'newQuestions', skip = 0) {
    if (collection == 'popularQuestions') {
      this.qs.getQuestions({orderBy: 'showCount',skip}).subscribe(_res => {
        this.popularQuestions = _res.questions
        this.popularQuestionsMeta = _res.meta
      })
    }

    if (collection == 'noAnswerQuestions') {
      this.qs.getQuestions({orderBy: 'answers',skip}).subscribe(_res => {
        this.noAnswerQuestions = _res.questions;
        this.noAnswerQuestionsMeta = _res.meta;
      })
    }
    else {
      this.qs.getQuestions({skip}).subscribe(_res => {
        this.newQuestions = _res.questions;
        console.log(_res)
        this.newQuestionsMeta = _res.meta
        console.log(this.newQuestionsMeta)
      })
    }

  }

  paginate($event) {
    this.getQuestions($event.collection , $event.skip)
    console.log("in home tabs : skip : ", $event)
  }

}
