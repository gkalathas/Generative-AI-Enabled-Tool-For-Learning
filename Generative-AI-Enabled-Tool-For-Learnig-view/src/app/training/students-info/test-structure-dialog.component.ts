import { Component, OnInit } from '@angular/core';
import { ToitsuSharedModule } from '../../toitsu-shared/toitsu-shared.module';
import { ToitsuToasterService } from '../../toitsu-shared/toitsu-toaster/toitsu-toaster.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  standalone: true,
  imports: [ToitsuSharedModule],
  selector: 'app-test-structure-dialog',
  template: `
    <div class="grid">
      <div class="col-12 p-fluid">
        <p-panel header="{{'Test Structure' | translate}}">

          <div class="grid">
            <div class="col-12 p-fluid">

              <div class="grid align-items-center">
                <label class="col-12 sm:col-4 font-bold">{{'Question Types' | translate}}</label>
                <div class="col-12 sm:col-8">
                  <p-dropdown [(ngModel)]="questionType" [ngModelOptions]="{standalone:true}"  name="questionTypes"
                              [options]="questionTypes" optionValue="value" optionLabel="label"
                              placeholder="{{'global.selectOption' | translate}}" emptyMessage="{{'global.noResultsFound' | translate}}"
                              emptyFilterMessage="{{'global.noResultsFound' | translate}}" [filter]="true" [showClear]="true">
                  </p-dropdown>
                </div>
              </div>

              <div class="grid align-items-center">
                <label class="col-12 sm:col-4 font-bold">{{'Course' | translate}}</label>
                <div class="col-12 sm:col-8">
                  <input pInputText [(ngModel)]="course" [ngModelOptions]="{standalone: true}">
                </div>
              </div>

              <div class="grid align-items-center" *ngIf="!questionType || questionType === 'both' || questionType ==='multiple_choice'">
                <label class="col-12 sm:col-4 font-bold">{{'Number of Multiple Choice' | translate}}</label>
                <div class="col-12 sm:col-8">
                  <p-inputNumber [(ngModel)]="numberOfMultipleChoiceQuestions" [ngModelOptions]="{standalone: true}" [useGrouping]="false" [min]="1" [max]="12"></p-inputNumber>
                </div>
              </div>

              <div class="grid align-items-center" *ngIf="!questionType || questionType === 'both' || questionType === 'elaboration'">
                <label class="col-12 sm:col-4 font-bold">{{'Number of Elaboration' | translate}}</label>
                <div class="col-12 sm:col-8">
                  <p-inputNumber [(ngModel)]="numberOfElaborationQuestions" [ngModelOptions]="{standalone: true}" [useGrouping]="false" [min]="1" [max]="12"></p-inputNumber>
                </div>
              </div>

            </div>

          </div>

          <div class="grid">
            <div class="col-12 button-container p-inputgroup flex justify-content-end">
              <button pButton type="button" pRipple label="{{'confirm' | translate}}"
                      class="p-button-help" icon="fa fa-table" iconPos="left" (click)="confirm()">
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
export class TestStructureDialogComponent implements OnInit {

  questionType = null;
  numberOfMultipleChoiceQuestions = null;
  numberOfElaborationQuestions = null;
  course = null;

  constructor(
    private toitsuToasterService: ToitsuToasterService,
    private dynamicDialogConfig: DynamicDialogConfig,
    private dynamicDialogRef: DynamicDialogRef) {}

  ngOnInit(): void {
    this.questionType = null;
    this.numberOfMultipleChoiceQuestions = null;
    this.numberOfElaborationQuestions = null;
    this.course = null;
  }

  questionTypes = [
    {value: 'multiple_choice', label: 'Multiple Choice'},
    {value: 'elaboration', label: 'Elaboration'},
    {value: 'both', label: 'Both'},
  ];

  confirm() {
    if (!this.questionType) {
      this.toitsuToasterService.showInfoStay('Question Type Required');
    }
    else if (!this.numberOfMultipleChoiceQuestions && this.questionType === 'multiple_choice') {
      this.toitsuToasterService.showInfoStay('The number of the multiple choice questions included is required');
    }
    else if (!this.numberOfElaborationQuestions && this.questionType === 'elaboration') {
      this.toitsuToasterService.showInfoStay('The number of the elaboration questions included is required');
    }
    else if (this.questionType === 'both' && (!this.numberOfElaborationQuestions || !this.numberOfMultipleChoiceQuestions)) {
      this.toitsuToasterService.showInfoStay('The number of questions for both types included is required');
    }
    else {
      this.dynamicDialogRef.close({questionType: this.questionType,
        numberOfMultipleChoiceQuestions: this.numberOfMultipleChoiceQuestions,
        numberOfElaborationQuestions: this.numberOfElaborationQuestions,
        course: this.course});
    }
  }

  cancel() {
    this.dynamicDialogRef.close();
  }
}
