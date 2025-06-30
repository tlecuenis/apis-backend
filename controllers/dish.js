import { dishModel } from "../model/dish.js"

export class DishController{

  static async getAll(req, res){
    const dishes = await dishModel.getAll()
    res.json(dishes)
  }

  static async getByID(req, res){
    const { id } = req.params
    const dish = await dishModel.getByID({ id })
    if(dish) return res.json(dish)
    return res.status(400).json({message: 'Plato no encontrado.'})
  }

  static async getByCategory(req, res){
    const { category } = req.params
    const dishesByCat = await dishModel.getByCategory({ category })
    if(dishesByCat) return res.json(dishesByCat)
    return res.status(400).json({message: "La categoría no exsite o no contiene platos."})
  }

  static async createDish(req, res){
    const result = await dishModel.createDish(req.body)
    if(result.succes) return res.json(result.data)
    return res.status(400).json({message: "Error creando el plato.", errors: result.error.format()})
  }
}