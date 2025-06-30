import { db } from "../repository/dishes.js";
import { validateDish } from "../schema/dish.js";

export class dishModel{

  static async getAll(){
    return db
  }

  static async getByCategory({ category }){
    const response = db.filter(dish => dish.categories.includes(category))
    if (response.length>0) return response
    return null
  }

  static async getByID({ id }){
    const dish = db.find(dish => dish.id == id)
    if(dish) return dish
    return null
  }

  static async createDish(dish){
      const result = validateDish(dish)
      if (!result.success) {
      return {
        success: false,
        error: result.error
      };
    }

    const newDish = { ...dish }
    db.push(newDish)
    return{
      succes: true,
      data: newDish
    }
  }
}