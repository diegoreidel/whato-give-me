import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email: { type: String, unique: true },
    desires: [
        {
            ref: 'Desire',
            type: Schema.Types.ObjectId,
        }
    ],
    name: String,
    description: String,
    password: { type: String, select: false }
})

const UserSchema = mongoose.model('User', userSchema);
export default UserSchema;