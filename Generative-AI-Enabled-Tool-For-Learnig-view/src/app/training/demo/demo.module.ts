import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DemoViewComponent} from './demo-view.component';
import {demoRouting} from './demo.routing';
import {ToitsuSharedModule} from '../../toitsu-shared/toitsu-shared.module';
import {GeneralSharedModule} from '../../_general/general-shared.module';
import {DemoListComponent} from './demo-list.component';

@NgModule({
  declarations: [
    DemoListComponent,
    DemoViewComponent
  ],
  imports: [
    RouterModule.forChild(demoRouting),
    ToitsuSharedModule,
    GeneralSharedModule
  ]
})
export class DemoModule {
}
