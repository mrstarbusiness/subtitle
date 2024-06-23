import mongoose, { Schema } from "mongoose";


const imdbSchema = new Schema({
  title: {
    required: true,
    type: String
  },
  year: {
    required: false,
    type: Number,
  },
  content: {
    required: true,
    type: String
  },
  
});


export const imdbModel = mongoose.models.imdb ?? mongoose.model("imdb", imdbSchema);
