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
        default: Date.now,
        required: false
    }

}, {
    _id: false
}, {
    // hide _v
    versionKey: false
});

export default mongoose.model("ObjectSchema", schema);