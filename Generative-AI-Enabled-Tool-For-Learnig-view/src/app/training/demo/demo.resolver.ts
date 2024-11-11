import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Injectable} from '@angular/core';
import {DemoService} from './demo.service';

@Injectable({providedIn: 'root'})
export class DemoResolver implements Resolve<any> {

  constructor(private demoService: DemoService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.demoService.getDemo(route.paramMap.get('id'));
  }
}
