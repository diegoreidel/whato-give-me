import UserSchema from "../schemas/user-schema";

export function saveUser(user: User): void {
    UserSchema.findByIdAndUpdate(user, { upsert: true });
}

export async function findUsers(): Promise<User[]> {
    return await UserSchema.find({}).then();
}

export async function findUser(email: string): Promise<User> {
    return await UserSchema.findOne({ email }).then();
}
