import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  Type,
  UserLogin,
} from '@nx-pokemon/test';
import { Router } from '@angular/router';
import { map, catchError, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  public currentUser$ = new BehaviorSubject<UserLogin | undefined>(undefined);
  private readonly CURRENT_USER = 'currentuser';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient, private router: Router) {}


  getAllTypes(): Observable<Type[]> {
    return this.http.get<Type[]>('http://localhost:3000/types');
  }
  
}
