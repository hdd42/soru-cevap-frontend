import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {QuestionService} from "../services/question.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  noAnswerQuestions=[]
  popularQuestions=[]
  newQuestions=[]

  constructor(private qs:QuestionService) { }

  ngOnInit() {
    this.qs.getQuestions({}).subscribe(_res => this.newQuestions = _res.questions)
    this.qs.getQuestions({orderBy:'showCount'}).subscribe(_res => this.popularQuestions = _res.questions)
    this.qs.getQuestions({orderBy:'answers'}).subscribe(_res => this.noAnswerQuestions = _res.questions)

  }

}
