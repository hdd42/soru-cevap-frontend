import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {AnswerService} from "../../services/answers.service";


@Component({
  selector: 'app-answer-item',
  templateUrl: './answer-item.component.html',
  styleUrls: ['./answer-item.component.css']
})
export class AnswerItemComponent implements OnInit {

  @Input('answer') answer
  @Input('solved') solved
  @Input('questionUserId') questionUserId

  user:Observable<any>
  isLoggedIn:Observable<any>

  voteErrorMsg=''
  loginErrMsg=''

  @Output() solverEmitter = new EventEmitter()

  constructor(private sanitizer:DomSanitizer , private auth:AuthService, private as:AnswerService) { }

  ngOnInit() {
    this.user = this.auth.getUser()
    this.isLoggedIn = this.auth.isLoggedIn()
  }


  sanitize(answer:string) :string{
    return <string>this.sanitizer.bypassSecurityTrustHtml(answer)
  }

  solver($event){
    $event.preventDefault()

    this.as.questionSolved(this.answer._id)
      .subscribe((_res) => {
      console.log(this.answer)
        this.answer.solverMark=true;
        this.solverEmitter.emit(this.answer)
      })
  }

  upVote(){
    if (!this.auth.isLoggedInCurrent()) {
      this.showError("Oyvermek icin lutfen once giris yapin!")
    }
    this.as.upVote(this.answer._id)
      .subscribe(_res => {
        if(_res.success == 0){
          return this.showError(_res.message , 'vote')
        }
        else{
          this.answer.positiveCount +=1;
        }
      })
  }

  downVote(){
    if (!this.auth.isLoggedInCurrent()) {
      this.showError("Oyvermek icin lutfen once giris yapin!")
    }
    this.as.upVote(this.answer._id)
      .subscribe(_res => {
        if(_res.success == 0){
          return this.showError(_res.message , 'vote')
        }
        else{
          this.answer.negativeCount +=1;
        }
      })
  }

  showError(message, type='login'){
      if(type != 'login'){
        this.voteErrorMsg = message
        setTimeout(() =>{
          this.voteErrorMsg =''
        },2000)
      }

      else{
        this.loginErrMsg = message
        setTimeout(() =>{
          this.loginErrMsg =''
        },3000)
      }
  }
}
