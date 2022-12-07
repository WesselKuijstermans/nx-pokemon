import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValues, UserCredentials, UserLogin } from '@nx-pokemon/test';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'nx-pokemon-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  subs!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.subs = this.authService
      .getUserFromLocalStorage()
      .subscribe((user: UserLogin | undefined) => {
        if (user) {
          console.log('User already logged in > to dashboard');
          this.router.navigate(['/']);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  submit(): void {
    const formValues: FormValues = new FormValues(this.loginForm.value);
    const username = formValues.username;
    const password = formValues.password;
    const userCredentials: UserCredentials = {
      username,
      password,
    };
    console.log(userCredentials)
    this.authService.login(userCredentials).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/users']);
    });
  }
}
