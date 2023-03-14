import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  PokedexEntry,
  Pokemon,
  UserLogin,
} from '@nx-pokemon/test';
import { Router } from '@angular/router';
import { map, catchError, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  public currentUser$ = new BehaviorSubject<UserLogin | undefined>(undefined);
  private readonly CURRENT_USER = 'currentuser';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient, private router: Router) {}


  getAllMons(): Observable<PokedexEntry[]> {
    return this.http.get<PokedexEntry[]>('http://localhost:3000/pokemon')
  }

  addMon(pokedexEntry: PokedexEntry) {
    console.log('Reached!')
    return this.http.post<PokedexEntry>('http://localhost:3000/pokemon', pokedexEntry, {headers: this.headers})
  }

  
}
