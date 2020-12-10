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

const GroupSchema = mongoose.model('Group', groupSchema);
export default GroupSchema;
