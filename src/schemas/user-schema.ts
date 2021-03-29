import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    desires: [
        {
            ref: 'Desire',
            type: Schema.Types.ObjectId,
        }
    ],
    name: String,
    description: String,
    password: String
})

const UserSchema = mongoose.model('User', userSchema);
export default UserSchema;