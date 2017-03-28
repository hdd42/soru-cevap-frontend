import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AnswerService} from "../../services/answers.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.css']
})
export class AnswerFormComponent implements OnInit, AfterViewInit {
  @Input('question') _id
  @Input('answerInput') answerInput
  @Input('elementId') elementID

  @Output() messageAdded = new EventEmitter()
  @Output() answerUpdated = new EventEmitter()
  @Output() hideModal = new EventEmitter()

  answerRaw = ""
  answerBody = ""
  preValue;

  answerForm: FormGroup;
  titleCtrl: FormControl;

  errorMessage = ""

  constructor(private fb: FormBuilder, private as: AnswerService, private router:Router, private route:ActivatedRoute) {

    this.titleCtrl = new FormControl('', Validators.required)

    this.answerForm = fb.group({
      title: this.titleCtrl
    })
  }

  ngOnInit() {
    console.log("answerInput :", this.answerInput)
    if (this.answerInput) {
      this.editModeOn()
    }
  }

  ngAfterViewInit() {

  }

  handleAnswerText($event) {
    this.answerBody = $event.content;
    this.answerRaw = $event.contentRaw
  }

  addAnswer() {
    if (!this.answerRaw) {
      this.errorMessage = 'Lutfen Cevap Yazin'
      return;
    }
    let {answer = this.answerBody, answerRaw = this.answerRaw, title} = this.answerForm.value


    if (!this.preValue) {
      this.as.addAnswer(this._id, {answer, answerRaw, title})
        .subscribe(_res => {
          console.log(_res)
          this.messageAdded.emit(_res);
        })
    }

    else {
      this.as.updateAnswer({questionId :this._id, answerId:this.answerInput._id, answer, answerRaw, title})
        .subscribe(_res => {
          this.answerUpdated.emit(_res.answer)
          this.hideModal.emit()
          return
        })

    }
  }


  editModeOn() {
    console.log("answer2 : ", this.answerInput)
    this.titleCtrl.setValue(this.answerInput.title)
    this.preValue = this.answerInput.answer
  }
}
