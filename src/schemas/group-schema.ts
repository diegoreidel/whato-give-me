import mongoose, { Schema } from "mongoose";

const groupSchema = new Schema({
    name: String,
    description: String,
    users: [
        {
            ref: 'User',
            type: Schema.Types.ObjectId,
        }
    ],
})

const GroupModel = mongoose.model('Group', groupSchema);
export default GroupModel;
