import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {DemoService} from './demo.service';

@Component({
  selector: 'app-demo-list',
  templateUrl: 'demo-list.component.html'
})
export class DemoListComponent {

  allDemos = [];

  viewLink = '/training/demo/view';

  constructor(
    private demoService: DemoService,
    private router: Router
  ) {
  }

  loadTableData() {
    this.allDemos = this.demoService.getAllDemos();
  }

  newRecord() {
    this.router.navigate([this.viewLink]);
  }

}
