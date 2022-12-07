import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  UserCredentials,
  UserIdentity,
  UserLogin,
  UserRegistration,
} from '@nx-pokemon/test';
import { Router } from '@angular/router';
import { map, catchError, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser$ = new BehaviorSubject<UserLogin | undefined>(undefined);
  private readonly CURRENT_USER = 'currentuser';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient, private router: Router) {
    // Check of we al een ingelogde user hebben
    // Zo ja, check dan op de backend of het token nog valid is.
    // Het token kan namelijk verlopen zijn. Indien verlopen
    // retourneren we meteen een nieuw token.
    this.getUserFromLocalStorage()
      .pipe(
        // switchMap is overbodig als we validateToken() niet gebruiken...
        switchMap((user: UserLogin | undefined) => {
          if (user) {
            console.log('User found in local storage');
            this.currentUser$.next(user);
            // return this.validateToken(user);
            return of(user);
          } else {
            console.log(`No current user found`);
            return of(undefined);
          }
        })
      )
      .subscribe(() => console.log('Startup auth done'));
  }

  login(formData: UserCredentials): Observable<UserLogin | undefined> {
    console.log(`login at localhost:3000/login`);

    return this.http
      .post<UserLogin>('http://localhost:3000/login', formData, {
        headers: this.headers,
      })
      .pipe(
        map((user: UserLogin) => {
            console.log(user)
          this.saveUserToLocalStorage(user);
          this.currentUser$.next(user);
          return user;
        }),
        catchError((error) => {
          console.log('error:', error);
          console.log('error.message:', error.message);
          console.log('error.error.message:', error.error.message);
          return of(undefined);
        })
      );
  }

  register(userData: UserRegistration): Observable<UserLogin | undefined> {
    console.log(`register at http://localhost:3000/register`);
    console.log(userData);
    return this.http
      .post<UserLogin>('http://localhost:3000/register' , userData, {
        headers: this.headers,
      })
      .pipe(
        map((user) => {
          this.saveUserToLocalStorage(user)
          this.currentUser$.next(user)
          return user;
        }),
        catchError((error) => {
          console.log('error:', error);
          console.log('error.message:', error.message);
          console.log('error.error.message:', error.error.message);
          return of(undefined);
        })
      );
  }

  logout(): void {
    this.router
      .navigate(['/'])
      .then((success) => {
        // true when canDeactivate allows us to leave the page.
        if (success) {
          console.log('logout - removing local user info');
          localStorage.removeItem(this.CURRENT_USER);
          this.currentUser$.next(undefined);
        } else {
          console.log('navigate result:', success);
        }
      })
      .catch((error) => console.log('not logged out!', error));
  }

  getUserFromLocalStorage(): Observable<UserLogin | undefined> {
    const userData = localStorage.getItem(this.CURRENT_USER);
    if (userData && userData != 'undefined') {
      const localUser = JSON.parse(userData);
      return of(localUser);
    } else {
      return of(undefined);
    }
  }

  private saveUserToLocalStorage(user: UserLogin): void {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
  }

  userMayEdit(itemUserId: string): Observable<boolean> {
    console.log('userMayEdit');
    return this.currentUser$.pipe(
      map((user: UserLogin | undefined) =>
        user ? user.id === itemUserId : false
      )
    );
  }

  getAuthorizationToken(): string | undefined {
    const userData = localStorage.getItem(this.CURRENT_USER);
    if (userData) {
      const user: UserLogin = JSON.parse(userData);

      return user.token;
    }
    return undefined;
  }
}
