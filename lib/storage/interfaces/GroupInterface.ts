import {ApplicationInterface} from "./ApplicationInterface";

export interface GroupInterface {
    group: string,
    instances: ApplicationInterface[],
    createdAt: Date,
    updatedAt: Date
}

export interface GroupResponseInterface {
    group: string,
    instances: number,
    createdAt: Date,
    updatedAt: Date
}