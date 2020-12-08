import mongoose, { Schema } from "mongoose";

const groupSchema = new Schema({
    name: String,
    description: String,
    users: [
        {
            ref: 'User',
            type: mongoose.Schema.Types.ObjectId,
        }
    ],
})
export default groupSchema;