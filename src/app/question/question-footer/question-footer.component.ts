import {Component, Input, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {QuestionService} from "../../services/question.service";
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-question-footer',
  templateUrl: './question-footer.component.html',
  styleUrls: ['./question-footer.component.css'],
  host:{
    "class":'x_boxFooter'
  }
})
export class QuestionFooterComponent implements OnInit {

  @Input('question') question
  @Input('short') short

  loginErrMsg=""


  constructor(private qs:QuestionService, private auth:AuthService) {

  }

  ngOnInit() {

  }


  upVote($event){
    $event.preventDefault()
    if(!this.auth.isLoggedInCurrent()){
      this.loginErrMsg ="Oyvermek icin lutfen once giris yapin!"
      return
    }
    this.qs.upVote(this.question._id)
      .subscribe(_res => {
        this.question.votesCount.total += 1
        this.question.votesCount.upVote += 1
      })
  }

  downVote($event){
    $event.preventDefault()
    if(!this.auth.isLoggedInCurrent()){
      this.loginErrMsg ="Oyvermek icin lutfen once giris yapin!"
      return
    }
    this.qs.downVote(this.question._id)
      .subscribe(_res =>{
        this.question.votesCount.total += 1
        this.question.votesCount.downVote += 1
      } )
  }

}
