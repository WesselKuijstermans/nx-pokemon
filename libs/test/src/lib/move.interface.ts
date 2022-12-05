import { Type } from "./type.interface";
import { UserIdentity } from "./user.interface";

export interface Move {
    name: string;
    description: string;
    type: Type;
    category: string;
    makesContact: boolean;
    pp: number;
    power: number;
    accuracy: number;
    createdBy: UserIdentity;
}