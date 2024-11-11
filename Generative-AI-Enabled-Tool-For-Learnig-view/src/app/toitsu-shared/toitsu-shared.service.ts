import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {NavigationEnd, Router} from '@angular/router';
import {FormArray, FormGroup} from '@angular/forms';
import {Observable, ReplaySubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ToitsuSharedService {
  
  private previousUrl: string;
  private currentUrl: string;
  
  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }
  
  // ---------------------------------------------------------------------------------------------------------------------------------------
  
  initHttpParams(paramsObject) {
    let httpParams = new HttpParams();
    for (let key of Object.keys(paramsObject)) {
      if (paramsObject[key] !== undefined && paramsObject[key] !== null) {
        httpParams = httpParams.append(key, paramsObject[key]);
      }
    }
    return httpParams;
  }
  
  // ---------------------------------------------------------------------------------------------------------------------------------------
  
  responsiveWidth(width) {
    return (window.innerWidth <= 1024) ? (width + 'rem') : (width + '%');
  }
  
  // ---------------------------------------------------------------------------------------------------------------------------------------
  
  convertFileToBase64(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }
  
  // ---------------------------------------------------------------------------------------------------------------------------------------
  
  getPreviousUrl() {
    return this.previousUrl;
  }
  
  updateTreeValidity(group): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.controls[key];
      
      if (abstractControl instanceof FormGroup || abstractControl instanceof FormArray) {
        this.updateTreeValidity(abstractControl);
      } else {
        abstractControl.updateValueAndValidity();
      }
    });
  }
}
