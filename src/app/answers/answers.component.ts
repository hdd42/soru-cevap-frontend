import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AnswerService} from "../services/answers.service";

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {
  @Input('answers') answers
  @Input('solved') solved
  @Input('questionUserId') questionUserId
  @Output() answerDeletedEmitter= new EventEmitter()
  @Output() answerUpdateEmitter= new EventEmitter()

  constructor(private as : AnswerService) { }

  ngOnInit() {

  }
  questionSolved($event){
    this.solved.status=true;
    this.solved.user =$event.user
  }

  answerDeleted(id){
    this.answerDeletedEmitter.emit(id)
  }

  updateAnswer(id){
    this.answerUpdateEmitter.emit(id)
  }
}
