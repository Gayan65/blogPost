import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  fname: String,
  createDate: Date,
  nickName: String,
  admin: Boolean,
});

export const User = mongoose.model("User", userSchema);

//const User = mongoose.model('User', userSchema);

//const user1 = new User({ username: 'Silence', password: 'password' });

//await user1.save();

//console.log("saved");
