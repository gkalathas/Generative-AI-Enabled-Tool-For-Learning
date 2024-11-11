import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Demo} from './demo.model';
import {DemoService} from './demo.service';
import {ToitsuToasterService} from '../../toitsu-shared/toitsu-toaster/toitsu-toaster.service';

@Component({
  selector: 'app-demo-view',
  templateUrl: 'demo-view.component.html'
})
export class DemoViewComponent {

  homePageLink = '/';

  id: number;
  demo: Demo;
  
  professions = [];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private demoService: DemoService,
    private toitsuToasterService: ToitsuToasterService,
  ) {

    // Αποθήκευση του id της εγγραφής από το URL
    this.id = +this.route.snapshot.params['id'];

    // Φόρτωση εγγραφής βάση του id ή δημιουργία νέας εγγραφής
    this.demo = this.id ? this.route.snapshot.data['record'] : new Demo();

    // Φόρτωση λιστών για dropdown
    this.professions = this.demoService.getAllProfessions();
  }

  goToStartingPage() {
    this.router.navigate([this.homePageLink]);
  }

  goToList() {
    this.router.navigate(['/demo/list']);
  }
  
  showDemoDetails() {
    
    let description = '';
    
    if (this.demo.lastName) {
      description += this.demo.lastName + ' ';
    }
    
    if (this.demo.firstName) {
      description += this.demo.firstName;
    }
    
    if (this.demo.profession) {
      let professionLabel = this.professions.filter(profession => profession.value === this.demo.profession).map(profession => profession.label);
      description += ' [ ' + professionLabel + ' ]';
    }
    
    this.toitsuToasterService.showInfoStay(description);
  }

  showInfoButton() {
    return this.demo.lastName || this.demo.firstName || this.demo.profession;
  }

}
