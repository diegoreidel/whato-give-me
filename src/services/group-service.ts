import mongoose from "mongoose";

import groupSchema from "../schemas/group-schema";

const GroupModel = mongoose.model('Group', groupSchema);

export function saveGroup(group: Group): void {
    GroupModel.findOneAndUpdate(group, group, { upsert: true }).exec();
}

export async function findGroups(): Promise<Group[]> {
    const groupModel = mongoose.model<Group & mongoose.Document>('Group', groupSchema);
    return groupModel.find();
}

export async function findGroup(id: string): Promise<Group> {
    return await GroupModel.findOne({ _id: id }).then();
}

export function deleteGroup(id: string): void {
    GroupModel.findOneAndDelete({ _id: id }).then();
}


