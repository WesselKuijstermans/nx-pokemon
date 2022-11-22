import { Id } from './id.type'

export interface UserIdentity {
    id: Id
    name: string
}

export interface UserInfo extends UserIdentity {
    emailAddress: string

}

export type User = UserInfo
