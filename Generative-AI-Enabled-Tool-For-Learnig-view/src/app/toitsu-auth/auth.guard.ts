import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {ToitsuNavService} from '../toitsu-layout/toitsu-nav/toitsu-nav.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router, private toitsuNavService: ToitsuNavService) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    
    return true;
  }
}
