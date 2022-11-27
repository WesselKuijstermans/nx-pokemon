/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'nx-pokemon-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  constructor(private http: HttpClient) {}

  _id!: string;

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    emailAddress: new FormControl('', [
      Validators.required, 
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
  });

  ngOnInit(): void {
  }

  ngOnDestroy(): void {}

  register(): void {
    console.log(this.registerForm.value);
    this.http.post<any>('http://localhost:3000/register', {
      emailAddress: this.registerForm.value.emailAddress,
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
    }).subscribe(data => {
      this._id = data.id;
    }); 
  }
}
