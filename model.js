import mongoose from "mongoose";

const schema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: String, required: true },
  createdAt : { type : Date, default: Date.now }
});

export default mongoose.model("object", schema);
