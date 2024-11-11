import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AppComponent} from '../../app.component';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-toitsu-header',
  templateUrl: './toitsu-header.component.html',
  styleUrls: ['./toitsu-header.component.css'],
})
export class ToitsuHeaderComponent {
  
  currentLanguage = this.translate.currentLang;
  
  constructor(
    public translate: TranslateService,
    public app: AppComponent,
  ) {}
  
  changeLanguage(newLanguage) {
    if (newLanguage !== this.currentLanguage) {
      this.translate.use(newLanguage).subscribe(() => {
        localStorage.setItem('toitsuLanguage', newLanguage);
        window.location.reload();
      });
    }
  }
}
