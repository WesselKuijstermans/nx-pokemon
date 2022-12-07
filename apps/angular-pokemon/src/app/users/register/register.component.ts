import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValues, UserRegistration } from '@nx-pokemon/test';
import { AuthService } from '../auth.service';

@Component({
  selector: 'nx-pokemon-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private userService: AuthService, private router: Router) {}


  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  submit(): void {
    const formValues: FormValues = new FormValues(this.registerForm.value);
    const username = formValues.username;
    const emailAddress = formValues.emailAddress;
    const password = formValues.password;
    const userRegistration: UserRegistration = {
      username,
      emailAddress,
      password
    }
    this.userService.register(userRegistration).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/users']);
    });
  }
}
