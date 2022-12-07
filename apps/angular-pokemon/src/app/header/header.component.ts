/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { UserLogin } from '@nx-pokemon/test';
import { Observable } from 'rxjs';
import { AuthService } from '../users/auth.service';

@Component({
  selector: 'nx-pokemon-app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  loggedInUser$!: Observable<UserLogin | undefined>;
  
  constructor(private authService: AuthService) {}

  
  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$;
  }

  logout(): void {
    this.authService.logout();
  }
}
