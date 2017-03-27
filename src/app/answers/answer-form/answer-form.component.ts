import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AnswerService} from "../../services/answers.service";

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.css']
})
export class AnswerFormComponent implements OnInit, AfterViewInit {
  @Input('question') _id
  @Input('answerInput') answerInput

  @Output() messageAdded = new EventEmitter()
  @Output() answerUpdated = new EventEmitter()

  answerRaw = ""
  answerBody = ""
  preValue;

  answerForm: FormGroup;
  titleCtrl: FormControl;

  errorMessage = ""

  constructor(private fb: FormBuilder, private as: AnswerService) {

    this.titleCtrl = new FormControl('', Validators.required)

    this.answerForm = fb.group({
      title: this.titleCtrl
    })
  }

  ngOnInit() {
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
    console.log("Answer : ", answerRaw)

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

        })

    }
  }


  editModeOn() {
    console.log("answer2 : ", this.answerInput)
    this.titleCtrl.setValue(this.answerInput.title)
    this.preValue = this.answerInput.answer
  }
}
