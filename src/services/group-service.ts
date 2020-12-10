import mongoose from 'mongoose';

import GroupSchema from "../schemas/group-schema";
import { findUser } from "./user-service";

export function saveGroup(group: Group): void {
    const query = {_id: group._id};
    if (!query._id) {
        query._id = new mongoose.mongo.ObjectID().toString();
    }

    GroupSchema.findOneAndUpdate(query, group, { useFindAndModify: true, upsert: true, }).exec();
}

export async function findGroups(): Promise<Group[]> {
    return GroupSchema.find({}).then();
}

export async function findGroup(id: string): Promise<Group> {
    return await GroupSchema.findOne({ _id: id }).then();
}

export function deleteGroup(id: string): void {
    GroupSchema.findOneAndDelete({ _id: id }).then();
}

export async function addUser(groupId: string, user: User): Promise<Group> {

    const userModel = await findUser(user.email);
    const groupModel = await findGroup(groupId);

    groupModel.users.push(userModel);
    saveGroup(groupModel);
    return groupModel;
}
