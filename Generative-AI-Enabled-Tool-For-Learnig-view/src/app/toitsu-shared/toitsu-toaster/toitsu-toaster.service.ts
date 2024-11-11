import {Injectable} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {MessageService} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';

@Injectable({providedIn: 'root'})
export class ToitsuToasterService {
  
  constructor(
    private jsonPipe: JsonPipe,
    private messageService: MessageService,
    private translate: TranslateService
  ) {}
  
  clearMessages() {
    this.messageService.clear();
  }
  
  showSuccessStay(message?) {
    if (!message) {
      message = this.translate.instant('global.save.success');
    }
    this.clearMessages();
    this.messageService.add({severity: 'success', summary: '', detail: message, life: 99999});
  }
  
  showErrorStay(message) {
    this.clearMessages();
    this.addErrorStay(message);
  }
  
  showWarningStay(message) {
    this.clearMessages();
    this.addWarningStay(message);
  }
  
  showInfoStay(message) {
    this.clearMessages();
    this.addInfoStay(message);
  }
  
  addErrorStay(message) {
    this.messageService.add({severity: 'error', summary: '', detail: message, life: 99999});
  }
  
  addWarningStay(message) {
    this.messageService.add({severity: 'warn', summary: '', detail: message, life: 99999});
  }
  
  addInfoStay(message) {
    this.messageService.add({severity: 'info', summary: '', detail: message, life: 99999});
  }
  
  apiValidationErrors(response) {
    if (response && response.status === 422 && response.error && response.error.errors && response.error.errors.length > 0) {
      let fullError = '';
      for (const error of response.error.errors) {
        fullError += error + '<br/>';
      }
      this.messageService.add({severity: 'error', summary: '', detail: fullError, life: 99999});
    }
    else {
      let detail;
      if (response['error'] && response['error']['errorId']) {
        detail = '<b>' + this.translate.instant('global.error.500.title') + '</b>' + '<br />' +
          this.translate.instant('global.error.500.errorId') + ': ' +  response['error']['errorId'] + '<br />' +
          this.translate.instant('global.error.500.errorMessage') + ': ' +  response['error']['errorMessage'];
      }
      else {
        detail = this.jsonPipe.transform(response);
      }
      
      this.messageService.add({severity: 'error', summary: '', detail: detail, life: 99999});
    }
  }
  
  showErrorsStay(responseError) {
    this.clearMessages();
    
    try {
      if (responseError.error) {
        let decodedString = new TextDecoder().decode(responseError.error);
        let jsonData = JSON.parse(decodedString);
        
        if (this.isUnprocessableEntityError(jsonData, responseError)) {
          this.displayUnprocessableEntityError(jsonData);
        } else {
          this.displayGenericError(responseError);
        }
      } else {
        this.displayGenericError(responseError);
      }
    } catch (error) {
      console.error('Error processing response:', error);
      
      this.displayGenericError(responseError);
    }
  }
  
  private isUnprocessableEntityError(jsonData, responseError) {
    return !!jsonData && responseError.status === 422 && jsonData.errors && jsonData.errors.length > 0;
  }
  
  private displayUnprocessableEntityError(jsonData) {
    let fullError = jsonData.errors.join('<br/>');
    this.messageService.add({ severity: 'error', summary: '', detail: fullError, life: 99999 });
  }
  
  private displayGenericError(responseError) {
    let detail;
    if (responseError.status && responseError.statusText && responseError.message) {
      detail = `<b>${this.translate.instant('global.error.' + responseError.status + '.title')}</b><br />` +
        `${this.translate.instant('global.error' + responseError.status + '.errorId')}: ${responseError.statusText}<br />` +
        `${this.translate.instant('global.error.' + responseError.status + '.errorMessage')}: ${responseError.message}`;
    } else {
      detail = this.jsonPipe.transform(responseError);
    }
    this.messageService.add({ severity: 'error', summary: '', detail: detail, life: 99999 });
  }

}
