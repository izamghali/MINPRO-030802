type Organizer = {
    id: number
    isOrg: boolean
}

declare namespace Express {
    export interface Request {
        organizer?: Organizer
    }
}