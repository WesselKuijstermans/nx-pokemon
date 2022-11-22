/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserRegistration} from '@nx-pokemon/test'

@Component({
  selector: 'nx-pokemon-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user!: UserRegistration;
  constructor(private http: HttpClient) {
  }

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

  register(): void {
    this.user.emailAddress = this.registerForm.value.emailAddress!;
    this.user.password = this.registerForm.value.password!;
    this.user.username = this.registerForm.value.username!;
    const req = this.http.post('http://localhost:3000/register', this.user);
     req.subscribe();
  }

}
