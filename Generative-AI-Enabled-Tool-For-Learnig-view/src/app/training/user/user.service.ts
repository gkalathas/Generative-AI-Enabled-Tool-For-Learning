import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { userConsts } from './user.consts';
import { ToitsuSharedService } from '../../toitsu-shared/toitsu-shared.service';
import { User } from './user.model';

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private http: HttpClient,
              private toitsuSharedService: ToitsuSharedService) {}

  getByUsernameAndPassword(username, password) {
    return this.http
      .get<User>(
        environment.apiBaseUrl + userConsts.getByUsernameAndPassword,
        {
          params: this.toitsuSharedService.initHttpParams({username, password})
        }
      );
  }

  saveUser(user) {
    return this.http
      .post(environment.apiBaseUrl + userConsts.save, user);
  }
}
