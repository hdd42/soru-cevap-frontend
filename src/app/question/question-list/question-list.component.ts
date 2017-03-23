import {Component, Input, OnInit} from '@angular/core';
import {QuestionService} from "../../services/question.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  @Input('questions') questions :Observable<any>
  constructor(private qs:QuestionService) {

  }

  ngOnInit() {

  }

}
