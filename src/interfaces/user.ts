interface User {
    _id?: string,
    email: string,
    password: string,
    name: string,
    description?: string,
    desires?: Desire[]
}