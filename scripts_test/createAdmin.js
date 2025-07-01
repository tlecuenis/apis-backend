// scripts/createUser.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "../model/user.js";

dotenv.config();

async function createAdminUser() {
  await mongoose.connect(process.env.MONGO_URL);

  const hashedPassword = bcrypt.hashSync("admin123", 10);

  const user = new User({
    username: "admin",
    password: hashedPassword,
    email: "admin@ejemplo.com"
  });

  await user.save();
  console.log("Usuario creado.");
  mongoose.disconnect();
}

createAdminUser();
