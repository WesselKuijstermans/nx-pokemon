import { Id } from './id.type'
import { OwnedPokemon } from './pokemon.interface'

export interface UserIdentity {
    id: Id
    name: string
}

export interface UserInfo extends UserIdentity {
    emailAddress: string

}

export interface Trainer extends UserIdentity {
    team: OwnedPokemon[];
}

export interface UserLogin extends UserInfo {
    _id: any
    token: string
}

export type User = UserInfo
