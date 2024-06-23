import mongoose, { Schema } from "mongoose";

const CounterSchema = new Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 },
    createdAt : {type: Date, default: Date.now }
})

export const counterModel = mongoose.models.counter || mongoose.model("counter", CounterSchema);