import {Component, EventEmitter, Input, OnInit, Optional, Output, SkipSelf, ViewChild} from '@angular/core';
import {ControlContainer} from '@angular/forms';

@Component({
  selector: 'app-toitsu-ckeditor',
  templateUrl: './toitsu-ckeditor.component.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new Optional(), new SkipSelf(), ControlContainer]]
    }
  ]
})
export class ToitsuCkeditorComponent implements OnInit {
  
  @Input() editorOptions: string;
  @Input() data: string;
  @Input() model: string;
  
  @Output() modelChange = new EventEmitter<string>();
  
  @ViewChild('editorComponent') editorComponent;
  
  constructor() {}
  
  ngOnInit() {
  } 
  
  emitModelChange() {
    this.modelChange.emit(this.model);
  }
}
