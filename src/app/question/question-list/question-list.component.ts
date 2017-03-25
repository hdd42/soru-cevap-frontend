import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuestionService} from "../../services/question.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  @Input('questions') questions :Observable<any>
  @Input('meta') meta ;
  @Input('collection') collection ;
  @Output() paginateEmitter = new EventEmitter()

  constructor(private qs:QuestionService) {

  }

  ngOnInit() {
  console.log("meay : ", this.meta)
  }

  paginate($event){
    this.paginateEmitter
      .emit(
        {
          collection:this.collection,
          skip:$event
        }
      )
  }

}
