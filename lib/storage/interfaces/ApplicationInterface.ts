export interface ApplicationInterface {
    id: string,
    group: string,
    createdAt: Date,
    updatedAt: Date,
    meta: object | undefined,
    timeout: any
}

export interface ApplicationResponseInterface {
    id: string,
    group: string,
    createdAt: Date,
    updatedAt: Date,
    meta: object | undefined
}