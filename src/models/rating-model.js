import mongoose, { Schema } from "mongoose";

const ratingSchema = new Schema({
  rating : {
    type : Number,
    required : true,
  },
  user : {
    type : Schema.ObjectId,
    ref: "users"
  },
  subtitle : {
    type : Schema.ObjectId,
    ref: "subtitles"
  },
  createdAt : {
    type : Date,
    default : Date.now,
  }
});


export const ratingModel = mongoose.models.ratings || mongoose.model("ratings", ratingSchema);

