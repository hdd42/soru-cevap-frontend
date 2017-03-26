import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-question-header',
  templateUrl: './question-header.component.html',
  styleUrls: ['./question-header.component.css'],
  host:{
    'class':'x_boxHeader'
  }
})
export class QuestionHeaderComponent implements OnInit {

  @Input('question') question
  @Input('short') short

  @Output() openModal = new EventEmitter()

  isLoggedIn:Observable<any>

  constructor(private auth:AuthService) { }

  ngOnInit() {
   this.isLoggedIn = this.auth.isLoggedIn()
  }

  openAnswerModal($event){
    $event.preventDefault()
    this.openModal.emit(true)

  }

  getShareUrl(slug){
    return `http://46.101.221.75/questions/${slug}`
  }


}
