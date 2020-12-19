import mongoose from 'mongoose'

import DesireSchema from '../schemas/desire-schema';
import UserSchema from '../schemas/user-schema';

export async function saveUser(user: User): Promise<User> {
    await UserSchema.findOneAndUpdate({ email: user.email }, user, { useFindAndModify: false, upsert: true });
    return findUser(user.email);
}

export async function findUsers(): Promise<User[]> {
    return await UserSchema.find({}).then();
}

export async function findUser(email: string): Promise<User> {
    return await UserSchema.findOne({ email }).populate('desires').then();
}

export async function saveDesire(email: string, des: Desire): Promise<User> {
    const userModel = await findUser(email);
    const desire = await createDesire(des);

    userModel.desires.push(desire);
    saveUser(userModel);
    return userModel;
}

async function createDesire(des: Desire): Promise<Desire> {
    if (!des._id) {
        des._id = new mongoose.mongo.ObjectID().toString();
    }
    const desire = new DesireSchema(des);
    return await desire.save().then();
}


