import { Component, OnInit } from '@angular/core';
import { ToitsuSharedModule } from '../../toitsu-shared/toitsu-shared.module';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToitsuToasterService } from '../../toitsu-shared/toitsu-toaster/toitsu-toaster.service';

@Component({
  standalone: true,
  imports: [ToitsuSharedModule],
  selector: 'app-open-ai-credentials',
  template: `
    <div class="grid">
      <div class="col-12 p-fluid">
        <p-panel header="{{'Chat Model Credentials' | translate}}">

          <div class="grid">
            <div class="col-12 p-fluid">

              <div class="grid align-items-center">
                <label class="col-12 sm:col-4">{{'Model' | translate}}</label>
                <div class="col-12 sm:col-8">
                  <input type="text" pInputText [(ngModel)]="chatModel" [ngModelOptions]="{standalone:true }" name="chatModel">
                </div>
              </div>

              <div class="grid align-items-center">
                <label class="col-12 sm:col-4">{{'Api Key' | translate}}</label>
                <div class="col-12 sm:col-8">
                  <input type="text" pInputText [(ngModel)]="apiKey" [ngModelOptions]="{standalone:true }" name="apiKey">
                </div>
              </div>
              
            </div>

          </div>

          <div class="grid">
            <div class="col-12 button-container p-inputgroup flex justify-content-end">
              <button pButton type="button" pRipple label="{{'confirm' | translate}}"
                      class="p-button-help" icon="fa fa-table" iconPos="left" (click)="changeModel()">
              </button>
              <button pButton type="button" pRipple label="{{'Cancel' | translate}}"
                      class="p-button-warning" icon="fs fs-ban" iconPos="left" (click)="cancel()">
              </button>

            </div>
          </div>

        </p-panel>
        
      </div>
      
    </div>
  `,
})
export class ChangeOpenAirCredentialsComponent implements OnInit {

  chatModel = null;
  apiKey = null;

  constructor(
    private toitsuToasterService: ToitsuToasterService,
    private dynamicDialogConfig: DynamicDialogConfig,
    private dynamicDialogRef: DynamicDialogRef) {}

  ngOnInit(): void {
    this.chatModel = null;
    this.apiKey = null;
  }

  changeModel() {
    if (!this.chatModel || !this.apiKey) {
      this.toitsuToasterService.showInfoStay('Username and password are required');
    }
    else {
      this.dynamicDialogRef.close({chatModel: this.chatModel, apiKey: this.apiKey});
    }
  }

  cancel() {
    this.dynamicDialogRef.close();
  }
}
