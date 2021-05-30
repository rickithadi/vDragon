import mongoose from "mongoose";

const schema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: new Date(),
        required: false
    }

}, {
    // hide _v
    versionKey: false
});

export default mongoose.model("ObjectSchema", schema);