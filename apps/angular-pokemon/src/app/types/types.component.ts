/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Type } from '@nx-pokemon/test';
import { Observable } from 'rxjs';
import { TypeService } from './types.service';

@Component({
  selector: 'nx-pokemon-app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css'],
})
export class TypesComponent implements OnInit {
  types!: Type[];
  constructor(private typeService: TypeService) {}

  ngOnInit(): void {
    this.typeService.getAllTypes().subscribe(resp => {
      console.log(resp);
      this.types =  resp;
      this.types.sort(function(a, b) {
        return a.name.localeCompare(b.name);
     });
    })
  }
}
