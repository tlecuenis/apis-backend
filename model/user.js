import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required: false},
  isSuperAdmin: {type: Boolean, default: false},
  deleted: {type: Boolean, default: false},
  deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  deletedAt: { type: Date, default: null }
})

export const User = mongoose.model('User', UserSchema)