import mongoose from 'mongoose';

import GroupModel from "../schemas/group-schema";
import { findUser } from "./user-service";

export function saveGroup(group: Group): void {
    const query = {_id: group._id};
    if (!query._id) {
        query._id = new mongoose.mongo.ObjectID().toString();
    }

    GroupModel.findOneAndUpdate(query, group, { useFindAndModify: true, upsert: true, }).exec();
}

export async function findGroups(): Promise<Group[]> {
    return GroupModel.find({}).then();
}

export async function findGroup(id: string): Promise<Group> {
    return await GroupModel.findOne({ _id: id }).then();
}

export function deleteGroup(id: string): void {
    GroupModel.findOneAndDelete({ _id: id }).then();
}

export async function addUser(groupId: string, user: User): Promise<Group> {

    const userModel = await findUser(user.email);
    const groupModel = await findGroup(groupId);

    groupModel.users.push(userModel);
    saveGroup(groupModel);
    return groupModel;
}
