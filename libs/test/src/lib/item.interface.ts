import { UserIdentity } from "./user.interface";

export interface Item {
    name: string;
    effect: string;
    createdBy: UserIdentity;
}