import {
  Component, OnInit, EventEmitter, Output, Input, AfterViewInit, OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

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
  @Input('preValue') preValue: String;
  @Output() onEditorContentChange = new EventEmitter();
  update=false;
  constructor(private ref:ChangeDetectorRef) { }

  editor;
  ngOnInit() {

  }

  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      //plugins: ['link', 'table','code','autolink'],
      skin_url: '/assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;

        editor.on('keyup', () => {
          const content = editor.getContent();
          const contentRaw = editor.getContent({format:'text'});
          this.onEditorContentChange.emit({content,contentRaw});
        });
    editor.on('init', () => {
          if (this.preValue) {
            this.update =!this.update
            editor.setContent(this.preValue)
            this.update =!this.update
            const content = editor.getContent();
            const contentRaw = editor.getContent({format:'text'});
            this.onEditorContentChange.emit({content,contentRaw});
          }

        })
      }

    });

  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

}
