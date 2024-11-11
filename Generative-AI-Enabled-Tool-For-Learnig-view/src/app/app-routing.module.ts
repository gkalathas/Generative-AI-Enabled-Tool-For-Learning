import {Routes} from '@angular/router';

import {Toitsu401Component} from './toitsu-shared/toitsu-401/toitsu-401.component';
import {Toitsu403Component} from './toitsu-shared/toitsu-403/toitsu-403.component';
import { StudentsInfoComponent } from './training/students-info/students-info.component';

export const appRoutes: Routes = [
  {path: '', component: StudentsInfoComponent},
  {path: '401', component: Toitsu401Component, data: {title: 'global.error.401.title'}},
  {path: '403', component: Toitsu403Component, data: {title: 'global.error.403.title'}},
  {path: 'training', loadChildren: () => import('./training/training.module').then(m => m.TrainingModule)},
  {path: '**', redirectTo: ''}
];

export class AppRoutingModule {
}
