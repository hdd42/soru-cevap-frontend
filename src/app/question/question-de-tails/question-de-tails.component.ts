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
  constructor(private qs:QuestionService, private route:ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params
      .flatMap(_params => this.qs.getQuestionBySlug(_params['slug']))
      .subscribe(_res => this.question = _res.message)

  }



  hide(answers){
    if(answers){
      this.question.answers = answers
    }
    this.childModal.hide()
  }

}
