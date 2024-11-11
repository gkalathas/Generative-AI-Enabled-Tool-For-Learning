import {Routes} from '@angular/router';

export const trainingRoutes: Routes = [
  // -------------------------------------------------------------------------------------------------------------------
  {path: 'demo', loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule)}
   // -------------------------------------------------------------------------------------------------------------------
];
