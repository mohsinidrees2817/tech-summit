import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter name"],
    },
    email: {
      type: String,
      required: [true, "please add email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please add password"],
    },
    userType: {
      type: String,
      default: "user",
    },
    //   userimage: {
    //     // data: Buffer,
    //     // contentType: String,
    //     type: String
    //     // required: [true, "please add image"]
    // },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
