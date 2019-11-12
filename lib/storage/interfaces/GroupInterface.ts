import {ApplicationInterface} from "./ApplicationInterface";

export interface GroupInterface {
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