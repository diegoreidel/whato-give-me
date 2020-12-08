import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    name: String,
    description: String
})

const UserSchema = mongoose.model('User', userSchema);
export default UserSchema;