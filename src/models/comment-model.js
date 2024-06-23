import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },

  user: { type: Schema.ObjectId, ref: "users" },
  subtitle: { type: Schema.ObjectId, ref: "subtitles" },
  status : {
    type: Number,
    default: 1,
  },
  createdAt : {
    type: Date,
    default : Date.now
  }
});

export const commentModel = mongoose.models.comments || mongoose.model("comments", commentSchema);
