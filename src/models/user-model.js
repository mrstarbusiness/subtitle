import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
  name: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  mobile: {
    type: String,
  },
  password: {
    required: true,
    type: String
  },
  image: {
    required: false,
    type: String
  },
  type: {
    required: false,
    type: Number,
    default: 3,
  },
  bio : {
    required : false,
    type: String
  },
  status : {
    required : true,
    type : Number,
    default: 1,
  },
  favouriteBlogs : [String],
  uploads: [{ type: Schema.Types.ObjectId, ref: 'subtitleModel' }],
  downloads: [{ type: Schema.Types.ObjectId, ref: 'subtitleModel' }],

});


// export const userModel = mongoose.models.users ?? mongoose.model("users", userSchema);
export const userModel = mongoose.models.users || mongoose.model("users", userSchema);
