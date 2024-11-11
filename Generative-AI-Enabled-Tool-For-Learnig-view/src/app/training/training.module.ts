import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {trainingRoutes} from './training.routing';
import { StudentsInfoComponent } from './students-info/students-info.component';
import { ToitsuSharedModule } from '../toitsu-shared/toitsu-shared.module';

@NgModule({
  declarations: [
    StudentsInfoComponent
  ],
  exports: [
  ],
  imports: [
    ToitsuSharedModule,
    RouterModule.forChild(trainingRoutes)
  ]
})
export class TrainingModule {
}
