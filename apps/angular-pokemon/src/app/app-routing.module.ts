import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { MovesComponent } from './moves/moves.component';
import { TypesComponent } from './types/types.component';
import { CasusComponent } from './casus/casus.component';
import { UsersComponent } from './users/users.component';
import { RegisterComponent } from './users/register/register.component';
import { LoginComponent } from './users/login/login.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent, children: [
    { path: ':id', component: UsersComponent }
  ]},
  { path: 'pokemon', component: PokemonComponent },
  { path: 'moves', component: MovesComponent },
  { path: 'types', component: TypesComponent },
  { path: 'casus', component: CasusComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
