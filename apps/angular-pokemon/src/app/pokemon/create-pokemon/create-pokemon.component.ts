/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  PokedexEntry,
  pokemonFormValues,
  Type,
  UserIdentity,
  UserLogin,
} from '@nx-pokemon/test';
import { userInfo } from 'os';
import { Observable } from 'rxjs';
import { TypeService } from '../../types/types.service';
import { AuthService } from '../../users/auth.service';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'nx-pokemon-create-pokemon',
  templateUrl: './create-pokemon.component.html',
  styleUrls: ['./create-pokemon.component.css'],
})
export class CreatePokemonComponent {
  loggedInUser$!: Observable<UserLogin | undefined>;
  user!: UserIdentity;
  createPokemonForm!: FormGroup;
  types: Type[] = [];

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private authService: AuthService,
    private typeService: TypeService
  ) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$;
    this.loggedInUser$.subscribe((val) => (this.user = val!));

    this.typeService.getAllTypes().subscribe((resp) => {
      console.log(resp);
      this.types = resp;
      this.types.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
    });

    this.createPokemonForm = new FormGroup({
      pokedexNumber: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      type1: new FormControl('', [Validators.required]),
      // type2: new FormControl('',[Validators.required]),
      hp: new FormControl('', [Validators.required, Validators.min(0)]),
      attack: new FormControl('', [Validators.required, Validators.min(0)]),
      specialAttack: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),
      defense: new FormControl('', [Validators.required, Validators.min(0)]),
      specialDefense: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),
      speed: new FormControl('', [Validators.required, Validators.min(0)]),
      evolvesFrom: new FormControl(''),
      evolvesInto: new FormControl(''),
      evolutionRequirement: new FormControl(''),
      createdBy: new FormControl(''),
    });
    this.createPokemonForm.get('createdBy')?.setValue(this.user);
  }

  submit(): void {
    const formValues: pokemonFormValues = new pokemonFormValues(
      this.createPokemonForm.value
    );
    const name = formValues.name;
    const pokedexNumber = formValues.pokedexNumber;
    const hp = formValues.hp;
    const attack = formValues.attack;
    const specialAttack = formValues.specialAttack;
    const defense = formValues.defense;
    const specialDefense = formValues.specialDefense;
    const speed = formValues.speed;

    const evolvesFrom = formValues.evolvesFrom;
    const evolvesInto = formValues.evolvesInto;
    const evolutionRequirement = formValues.evolutionRequirement;
    const moves = undefined;
    const abilities = undefined;
    const types: Type[] = [formValues.type1, formValues.type2];
    console.log(formValues.type1.name)
    console.log(types);
    const createdBy = formValues.createdBy;

    const pokedexEntry: PokedexEntry = {
      pokedexNumber,
      name,
      hp,
      attack,
      specialAttack,
      defense,
      specialDefense,
      speed,
      createdBy,
      evolvesFrom,
      evolvesInto,
      evolutionRequirement,
      moves,
      abilities,
      types,
    };
    console.log(pokedexEntry);

    this.pokemonService
      .addMon(pokedexEntry)
      .subscribe((resp) => console.log(resp.name));
  }
}
