import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class OpenAiService {

  constructor(
    private http: HttpClient
    ) {}

  generateTest(studentInfoDto) {
    return this.http
      .post(
        environment.apiBaseUrl + '/openai/generate',
        studentInfoDto
      );
  }

  evaluateTest(testAndAnswers) {
    return this.http
      .post(
        environment.apiBaseUrl + '/openai/evaluate',
        testAndAnswers
      );
  }
}
