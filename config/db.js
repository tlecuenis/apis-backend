import mongoose from "mongoose";
import 'dotenv/config'

export async function connectDB(){
  const MONGO_URL = process.env.MONGO_URL

  try{
    await mongoose.connect(MONGO_URL)
  }
  catch (error){
    console.log("Error conectando a la base de datos: ", error.message)
  }
} 