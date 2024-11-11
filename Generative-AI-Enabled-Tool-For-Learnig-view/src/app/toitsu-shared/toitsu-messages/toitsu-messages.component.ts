import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-toitsu-messages',
  templateUrl: './toitsu-messages.component.html',
  styleUrls: ['./toitsu-messages.component.css']
})
export class ToitsuMessagesComponent {

  @Input() model: any[] = [];

  getHtmlTag(item) {
    return item.htmlTag;
  }

  getMessageStyleClassBySeverity(severity) {
    if (severity === 'info') {
      return 'info-message';
    } else if (severity === 'success') {
      return 'success-message';
    } else if (severity === 'warn') {
      return 'warning-message';
    } else if (severity === 'error') {
      return 'error-message';
    }
  }

  getPanelMessageStyleClassBySeverity(severity) {
    if (severity === 'info') {
      return 'info-message-panel';
    } else if (severity === 'success') {
      return 'success-message-panel';
    } else if (severity === 'warn') {
      return 'warning-message-panel';
    } else if (severity === 'error') {
      return 'error-message-panel';
    }
  }

}
