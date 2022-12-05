import { UserIdentity } from "./user.interface"

export interface Ability {
    name: string
    effect: string
    createdBy: UserIdentity
}