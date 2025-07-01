// utils/addDeletedField.js
import mongoose from 'mongoose'
import { Dish } from '../model/dish.js'
import dotenv from 'dotenv'

dotenv.config()

async function run() {
  await mongoose.connect(process.env.MONGO_URL)

  // Update todos los platos que no tienen el campo "deleted"
  await Dish.updateMany(
  {}, // sin filtro para actualizar todos
  { $set: { deletedBy: null } }
)


  console.log("Platos actualizados con campos de eliminación lógica.")
  await mongoose.disconnect()
}

run()
