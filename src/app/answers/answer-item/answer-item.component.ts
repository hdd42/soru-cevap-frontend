import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-answer-item',
  templateUrl: './answer-item.component.html',
  styleUrls: ['./answer-item.component.css']
})
export class AnswerItemComponent implements OnInit {

  @Input('answer') answer

  constructor(private sanitizer:DomSanitizer) { }

  ngOnInit() {
  }


  sanitize(answer:string) :string{
    return <string>this.sanitizer.bypassSecurityTrustHtml(answer)
  }
}
