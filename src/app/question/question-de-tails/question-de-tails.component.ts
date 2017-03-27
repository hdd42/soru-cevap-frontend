import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {QuestionService} from "../../services/question.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {ModalDirective} from "ng2-bootstrap";

@Component({
  selector: 'app-question-de-tails',
  templateUrl: 'question-de-tails.component.html',
  styleUrls: ['question-de-tails.component.css']
})
export class QuestionDetailsComponent implements OnInit {
  @ViewChild('lgModal') public childModal:ModalDirective;

  question
  modalTitle =''
  answerToUpdate;
  constructor(private qs:QuestionService, private route:ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params
      .flatMap(_params => this.qs.getQuestionBySlug(_params['slug']))
      .subscribe(_res =>  {
        this.question = _res.message
        this.modalTitle = `Cevap Veriliyor : ${this.question.title}`
    })

  }



  hide(){

    this.childModal.hide()
  }

  newAnswer(answer){
  console.log("ss : ",answer)
    //answer.user = localStorage.getItem('user')
    this.question.answers = answer.message
    this.hide()
  }

  answerDeleted(id){
    this.question.answers = this.question.answers.filter(_a => _a._id != id)
  }

  updateAnswer(id){
    console.log("answer updating...")
    let answer = this.question.answers.filter(_a => _a._id == id)[0]
    this.answerToUpdate = answer
    console.log(answer)
    this.modalTitle= `Guncelleniyor : ${this.question.title}`
    this.childModal.show()
  }

  answerUpdated(answer){
    this.question.answers = this.question.answers.map(a => {
      if(a._id ==answer._id) return answer
      return a
    })
    this.hide()
  }
}
