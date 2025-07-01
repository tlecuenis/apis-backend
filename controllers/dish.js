import * as dishService from "../services/dish.js"

export class DishController{

  static async getAll(req, res){
    try{
      const filters = req.query
      const result = await dishService.getAllDishes(filters)
      if (result.success) return res.status(200).json(result.data)
      return res.status(400).json({error: result.error})
    }
    catch(error){
      return res.status(500).json({error: "internal server error"})
    }
  }


  static async getByID(req, res){
    try{
      const { id } = req.params
      const result = await dishService.getDishByID(id)
      if(result.success) return res.status(200).json(result.data)
      
      //Manejo de los errores
      const status = result.error === 'Plato no encontrado.' ? 404 : 400
      return res.status(status).json({error: result.error})
    }
    catch(error){
      res.status(500).json({error: "internal server error"})
    }
  }


  static async createDish(req, res){
    try{
      const result = await dishService.createDish(req.body)
      if(result.success) return res.status(201).json(result.data)
      return res.status(400).json({message: "Error creando el plato.", errors: result.error?.format?.() ?? result.error.message ?? result.error
  })
    }
    catch (error){
      return res.status(500).json({error: "internal server error"})
    }
  }

  
  static async updateDish(req, res){
    try{
      const { id } = req.params
      const updates = req.body
      //chequear que no quieran cambiar el id
      delete updates._id
      const result = await dishService.updateDish(id, updates)
      if(result.success) return res.status(result.status).json(result.data)
      return res.status(result.status).json({error: result.error})
    }
    catch (error){
      return res.status(500).json({error: "internal server error"})
    }
  }


  static async deleteByID(req, res){
    try{
      const { id } = req.params
      const userID = req.user.id
      const result = await dishService.deleteDishByID(id, userID)
      if(!result.success) return res.status(result.status).json({error: result.error})
      return res.status(result.status).json(result.data)
    }
    catch (error){
      return res.status(500).json({error: "internal server error"})
    }

  }
}