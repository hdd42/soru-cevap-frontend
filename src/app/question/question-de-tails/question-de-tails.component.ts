import {Component, HostBinding, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {QuestionService} from "../../services/question.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {ModalDirective} from "ng2-bootstrap";
import {slideInDownAnimation} from '../../animations'

@Component({
  selector: 'app-question-de-tails',
  templateUrl: 'question-de-tails.component.html',
  styleUrls: ['question-de-tails.component.css'],
  animations: [ slideInDownAnimation ]
})
export class QuestionDetailsComponent implements OnInit {
  @ViewChild('lgModal') public childModal:ModalDirective;
  @ViewChild('lgModalEdit') public childModalEdit:ModalDirective;

  /** Animations*/


  /** Animations*/

  question
  modalTitle =''
  answerToUpdate;
  formReady =false
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
    this.childModalEdit.hide()
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
    console.log('update : ',answer)
    this.modalTitle= `Guncelleniyor : ${this.question.title}`
    this.formReady = true;
    this.childModalEdit.show()
  }

  answerUpdated(answer){
    console.log('updated in nn')
    this.question.answers = this.question.answers.map(a => {
      if(a._id ==answer._id) return answer
      return a
    })
    this.childModalEdit.hide()
  }
}
