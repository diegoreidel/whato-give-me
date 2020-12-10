import mongoose, { Schema } from "mongoose";

const desireSchema = new Schema({
    user:
    {
        ref: 'User',
        type: Schema.Types.ObjectId,
    },
    summary: String,
    description: String,
    link: String,
    reason: String,
    type: Boolean
})

const DesireSchema = mongoose.model('Desire', desireSchema);
export default DesireSchema;