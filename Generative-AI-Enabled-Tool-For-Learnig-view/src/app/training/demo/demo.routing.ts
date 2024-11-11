import {Routes} from '@angular/router';
import {DemoViewComponent} from './demo-view.component';
import {DemoResolver} from './demo.resolver';
import {DemoListComponent} from './demo-list.component';

export const demoRouting: Routes = [
  // -------------------------------------------------------------------------------------------------------------------
  {
    path: '',
    children: [
      {path: 'list', component: DemoListComponent,
        data: {
          title: 'training.demo',
          breadcrumbs: [
            {label: 'group.training'},
            {label: 'training.demo'},
          ],
          permissions: ['']
        }
      },
      {path: 'view', component: DemoViewComponent,
        data: {
          title: 'training.demo.new',
          breadcrumbs: [
            {label: 'group.training'},
            {label: 'training.demo'},
            {label: 'training.demo.new'}
          ],
          permissions: ['']
        }
      },
      {path: 'view/:id', component: DemoViewComponent,
        resolve: {record: DemoResolver},
        data: {
          title: 'demo.edit',
          breadcrumbs: [
            {label: 'group.training'},
            {label: 'demo'},
            {label: 'demo.edit'}
          ],
          permissions: ['']
        }
      }
    ]
  }
];
