import {Component, Input, OnInit} from '@angular/core';
import {AnswerService} from "../services/answers.service";

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {
  @Input('answers') answers

  constructor(private as : AnswerService) { }

  ngOnInit() {

  }

}
