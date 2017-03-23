import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-question-block',
  templateUrl: './question-block.component.html',
  styleUrls: ['./question-block.component.css'],
  host:{
    'class':'x_boxBlock'
  }
})
export class QuestionBlockComponent implements OnInit {

  @Input('question') question

  constructor(private sanitizer:DomSanitizer) { }

  ngOnInit() {
  }

  sanitize(question:string) :string{
    return <string>this.sanitizer.bypassSecurityTrustHtml(question)
  }
}
