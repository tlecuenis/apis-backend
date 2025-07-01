import { Dish } from "../model/dish.js";
import { validateDish, validatePartialDish } from "../schema/dish.js";
import mongoose from "mongoose";



export async function getDishByID(id){
  if (!mongoose.Types.ObjectId.isValid(id)){
    return {success: false, error: 'La ID no es de tipo Object ID.'}
  }
  const dish = await Dish.findById(id)

  if(!dish) return {success: false, error: 'Plato no encontrado.'}
  
  return {success: true, data: dish}
}

export async function createDish(dish){
    const result = validateDish(dish)
    if(!result.success){
      return {success: false, error: result.error}
    }

    try{
      const newDish = await Dish.create(dish)
      return {success: true, data: newDish}
    }
    catch (error){
      return {success: false, error}
    }
}

export async function getAllDishes(filters){
  const query = {
    deleted: false
  }
  if (filters.category){
    query.categories = filters.category
  }
  try{
    const dishes = await Dish.find(query)
    if(dishes.length <= 0) return {success: false, error: 'No se encontraron platos.'}
    return {success: true, data: dishes}
  }
  catch (error){
    return {success: false, error: error.message}
  }
}

export async function updateDish(id, updates){
  if (!mongoose.Types.ObjectId.isValid(id)){
    return {success: false, error: 'ID inválido.', status: 400}
  }

  const validate = validatePartialDish(updates)
  if(!validate.success) return {success: false, error: validate.error.format(), status: 400}

  try{
    const updatedDish = await Dish.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    })

    if(!updatedDish) return {success: false, error: 'Plato no encontrado.', status: 404}
    return {success: true, data: updatedDish, status: 201}
  }
  catch (error){
    return {success: false, error: error.message, status: 500}
  }
}


export async function deleteDishByID(id, userID){
  if (!mongoose.Types.ObjectId.isValid(id)){
    return {success: false, error: 'ID inválido.', status: 400}
  }

  try{
    const deletedDish = await Dish.findByIdAndUpdate(id, {
      deleted: true,
      deletedBy: userID
    }, { new: true })
    if(!deletedDish) return {success: false, error: "Plato no encontrado", status: 404}
    return {success: true, data: deletedDish, status: 200}
  }
  catch (error){
    return {success: false, error: error.message, status:500}
  }
}