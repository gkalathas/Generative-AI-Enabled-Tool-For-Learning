import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {AccordionModule} from 'primeng/accordion';
import {BlockUIModule} from 'primeng/blockui';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {CheckboxModule} from 'primeng/checkbox';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import {DividerModule} from 'primeng/divider';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {DropdownModule} from 'primeng/dropdown';
import {FileUploadModule} from 'primeng/fileupload';
import {ImageModule} from 'primeng/image';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MultiSelectModule} from 'primeng/multiselect';
import {PanelModule} from 'primeng/panel';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RippleModule} from 'primeng/ripple';
import {TableModule} from 'primeng/table';
import {TreeTableModule} from 'primeng/treetable';
import {TabViewModule} from 'primeng/tabview';
import {ToastModule} from 'primeng/toast';
import {TooltipModule} from 'primeng/tooltip';
import {TranslateModule} from '@ngx-translate/core';

import {Toitsu401Component} from './toitsu-401/toitsu-401.component';
import {Toitsu403Component} from './toitsu-403/toitsu-403.component';
import {ToitsuTableComponent} from './toitsu-table/toitsu-table.component';
import {ToitsuCalendarComponent} from './toitsu-calendar/toitsu-calendar.component';
import {ToitsuCalendarMaskDirective} from './toitsu-calendar-mask/toitsu-calendar-mask';
import {ToitsuMessagesComponent} from './toitsu-messages/toitsu-messages.component';
import {ToitsuCkeditorComponent} from './toitsu-ckeditor/toitsu-ckeditor.component';
import {ToitsuPTableCellWidthDirective} from './toitsu-p-table-cell-width/toitsu-p-table-cell-width.directive';
import {ToitsuTextareaAutoResizeDirective} from './toitsu-textarea-auto-resize/toitsu-textarea-auto-resize.directive';
import {ToitsuCapitalizeDirective} from './toitsu-capitalize/toitsu-capitalize.directive';
import {ToitsuLockControlsDirective} from './toitsu-lock-controls/toitsu-lock-controls.directive';
import {ToitsuEnterKeySubmitDirective} from './toitsu-enter-key-submit.directive';
import {DropdownGlobalDirective} from './dropdown-global.directive';
import {InputNumberDotDirective} from './input-number-dot.directive';
import {ObjectToArrayPipe} from './object-to-array.pipe';
import {CKEditorModule} from 'ckeditor4-angular';
import {OverlayPanelModule} from 'primeng/overlaypanel';

@NgModule({
  declarations: [
    Toitsu401Component,
    Toitsu403Component,
    ToitsuTableComponent,
    ToitsuCalendarComponent,
    ToitsuCalendarMaskDirective,
    ToitsuMessagesComponent,
    ToitsuCkeditorComponent,
    ToitsuPTableCellWidthDirective,
    ToitsuTextareaAutoResizeDirective,
    ToitsuCapitalizeDirective,
    ToitsuLockControlsDirective,
    ToitsuEnterKeySubmitDirective,
    DropdownGlobalDirective,
    InputNumberDotDirective,
    ObjectToArrayPipe
  ],
  imports: [
    CommonModule,
    FormsModule,

    AccordionModule,
    BlockUIModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CheckboxModule,
    ConfirmDialogModule,
    DialogModule,
    DividerModule,
    DynamicDialogModule,
    DropdownModule,
    FileUploadModule,
    ImageModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    MultiSelectModule,
    PanelModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    RippleModule,
    TableModule,
    TreeTableModule,
    TabViewModule,
    ToastModule,
    TooltipModule,
    
    TranslateModule,
    
    BlockUIModule,
    TranslateModule,
    DynamicDialogModule,
    
    CKEditorModule,
    OverlayPanelModule
  ],
  exports: [
    Toitsu403Component,
    ToitsuTableComponent,
    ToitsuCalendarComponent,
    ToitsuCalendarMaskDirective,
    ToitsuMessagesComponent,
    ToitsuCkeditorComponent,
    ToitsuPTableCellWidthDirective,
    ToitsuTextareaAutoResizeDirective,
    ToitsuCapitalizeDirective,
    ToitsuLockControlsDirective,
    DropdownGlobalDirective,
    InputNumberDotDirective,
    ObjectToArrayPipe,
    ToitsuEnterKeySubmitDirective,
    
    CommonModule,
    FormsModule,
    
    AccordionModule,
    BlockUIModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CheckboxModule,
    ConfirmDialogModule,
    DialogModule,
    DividerModule,
    DynamicDialogModule,
    DropdownModule,
    FileUploadModule,
    ImageModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    MultiSelectModule,
    PanelModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    RippleModule,
    TableModule,
    TreeTableModule,
    TabViewModule,
    ToastModule,
    TooltipModule,
    OverlayPanelModule,
    TranslateModule
  ]
})
export class ToitsuSharedModule {
}
