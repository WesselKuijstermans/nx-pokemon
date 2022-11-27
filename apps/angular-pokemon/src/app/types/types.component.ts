/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Type } from '@nx-pokemon/test';
import { Observable } from 'rxjs';

@Component({
  selector: 'nx-pokemon-app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css'],
})
export class TypesComponent implements OnInit {
  types!: Type[];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllTypes().subscribe(resp => {
      console.log(resp);
      this.types =  resp;
    })
  }

  getAllTypes(): Observable<Type[]> {
    return this.http.get<Type[]>('http://localhost:3000/types');
  }
}
