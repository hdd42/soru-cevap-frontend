import {Component, OnInit, EventEmitter, Output, Input, AfterViewInit,OnDestroy } from '@angular/core';

import 'tinymce';
import 'tinymce/themes/modern';


declare var tinymce: any;

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit , AfterViewInit, OnDestroy {
  @Input() elementId: String;
  @Output() onEditorContentChange = new EventEmitter();
  constructor() { }

  editor;
  ngOnInit() {
  }

  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      //plugins: ['link', 'table'],
      skin_url: '/assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          const contentRaw = editor.getContent({format:'text'});
          this.onEditorContentChange.emit({content,contentRaw});
        });
      }
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

}
