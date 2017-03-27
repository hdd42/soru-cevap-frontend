import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Observable} from "rxjs";
import {QuestionService} from "../../services/question.service";
import {Router} from "@angular/router";

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
  deleting=false;
  isLoggedIn:Observable<any>
  user :Observable<any>
  constructor(private auth:AuthService, private qs:QuestionService , private router:Router) { }

  ngOnInit() {
   this.isLoggedIn = this.auth.isLoggedIn()
    this.user=this.auth.getUser()
  }

  openAnswerModal($event){
    $event.preventDefault()
    this.openModal.emit(true)

  }

  getShareUrl(slug){
    return `http://46.101.221.75/questions/${slug}`
  }
  shareLater($event){
    $event.preventDefault()
  }

  delete(){
    this.qs.deleteQuestion(this.question._id)
      .subscribe(_res =>{
        this.router.navigate(['/'])
      })
  }

}
