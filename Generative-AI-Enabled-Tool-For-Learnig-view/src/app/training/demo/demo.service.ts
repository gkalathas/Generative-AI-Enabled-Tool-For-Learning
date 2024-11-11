import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({providedIn: 'root'})
export class DemoService {
  
  constructor(
    private translateService: TranslateService
  ) {
  }

  getAllDemos() {
    return [
      {id: 1, lastName: 'Papadopoulos', firstName: 'Giannis', birthDate: new Date('1990-01-01'),  profession: 'softwareDeveloper'},
      {id: 2, lastName: 'Papageorgiou', firstName: 'Athanasios', birthDate: new Date('2000-10-01'), profession: 'militaryOfficer'},
      {id: 3, lastName: 'Andreopoulos', firstName: 'Charalampos', birthDate: new Date('2002-11-25'), profession: 'plumber'},
      {id: 4, lastName: 'Papadimitriou', firstName: 'Dimitrios', birthDate: new Date('1963-03-08'), profession: 'couchSampler'}
    ];
  }

  getDemo(id) {
    return this.getAllDemos()[id - 1];
  }

  getAllProfessions() {
    return [
      {value: 'softwareDeveloper', label: this.translateService.instant('developer')},
      {value: 'plumber', label: this.translateService.instant('plumber')},
      {value: 'militaryOfficer', label: this.translateService.instant('militaryOfficer')},
      {value: 'couchSampler', label: this.translateService.instant('couchSampler')}
    ];
  }

}
