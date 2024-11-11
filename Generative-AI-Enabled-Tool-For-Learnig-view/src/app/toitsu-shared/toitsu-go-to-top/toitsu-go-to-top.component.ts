import {Component, HostListener} from '@angular/core';
import {ToitsuSharedModule} from '../toitsu-shared.module';
import {GeneralSharedModule} from '../../_general/general-shared.module';

@Component({
  standalone: true,
  imports: [ToitsuSharedModule, GeneralSharedModule],
  selector: 'app-toitsu-go-to-top',
  templateUrl: './toitsu-go-to-top.component.html',
  styleUrls: ['./toitsu-go-to-top.component.css']
})
export class ToitsuGoToTopComponent {
  
  showButton = false;
  
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showButton = window.scrollY > 100;
  }
}
