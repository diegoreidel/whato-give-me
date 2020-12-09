import UserSchema from "../schemas/user-schema";

export function saveUser(user: User): void {
    UserSchema.findOneAndUpdate({ email: user.email }, user, { useFindAndModify: true, upsert: true }).exec();
}

export async function findUsers(): Promise<User[]> {
    return await UserSchema.find({}).then();
}

export async function findUser(email: string): Promise<User> {
    return await UserSchema.findOne({ email }).then();
}
