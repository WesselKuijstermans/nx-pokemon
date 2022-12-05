import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  register(registerForm: FormGroup): Observable<string> {
    console.log('reached');
    return this.http.post<string>('http://localhost:3000/register', {
      emailAddress: registerForm.value.emailAddress,
      username: registerForm.value.username,
      password: registerForm.value.password,
    });
  }

  login(loginForm: FormGroup): Observable<string> {
    return this.http.post<string>('http://localhost:3000/register', {
      username: loginForm.value.username,
      password: loginForm.value.password,
    })
  }
}
