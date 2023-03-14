/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PokedexEntry } from '@nx-pokemon/test';
import { Observable } from 'rxjs';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'nx-pokemon-app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent {
  mons!: PokedexEntry[];

  constructor(
    private http: HttpClient,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.pokemonService.getAllMons().subscribe((resp) => {
      console.log(resp);
      this.mons = resp;
    });
  }
}
