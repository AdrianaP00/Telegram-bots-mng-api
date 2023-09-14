import mongoose, { Document, Model, Schema, now } from "mongoose";

const userSchema: Schema = new Schema(
  {
    userID: { type: String, required: true },
    chatID: { type: String, required: true },
    botName: {type:String, required:true},
    date: {type:Date, required:true , default: now()}
  },
  { collection: "user" }
);

interface IUser extends Document {
  userID: String;
  chatID: String;
  botName: String;
  date: Date;

}

const User: Model<IUser> = mongoose.model<IUser>("user", userSchema);

export default User;