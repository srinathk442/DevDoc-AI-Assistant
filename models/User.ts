// models/User.ts
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String }, // store hashed password
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
