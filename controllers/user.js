import { User } from "../model/user.js"
import * as userService from "../services/user.js"

export class userController{

  static async getAllUsers(req, res){
    try{
      const result = await userService.getAllUsers()
      if(!result.success) return res.status(result.status).json({ error: result.error })
      
      return res.status(result.status).json(result.data)
    }
    catch (error){
      return res.status(500).json({error: "internal server error"})
    }
  }

  static async getUserById(req, res){
    try{
      const { id } = req.params
      const result = await userService.getUserById(id)
      if(!result.success) return res.status(result.status).json({ error: result.error })
      
      return res.status(result.status).json(result.data)
    }
    catch (error){
      return res.status(500).json({error: "internal server error"})
    }
  }

  static async createUser(req, res){
    try{
      const { username, password, email } = req.body
      const response = await userService.createUser({ username, password, email })
      if(!response.success) return res.status(response.status).json({ error: response.error })
      return res.status(response.status).json(response.data)
    }
    catch (error){
      console.error(error)
      return res.status(500).json({ error: "internal server error" })
    }
  }

  static async updateUser(req, res){
    try{
        const { id } = req.params
        const updates = req.body
        //chequear que no quieran cambiar el id
        delete updates._id
        const result = await userService.updateUser(id, updates)
        if(!result.success) return res.status(result.status).json({ error: result.error })
        return res.status(result.status).json(result.data)
    }
    catch (error){
      return res.status(500).json({ error: "internal server error." })
    }
  }

  static async deletedUserByID(req, res){
    try{
      const { id } = req.params
      const userID = req.user.id //Este seria el id del pibe que va a eliminar al usuario, no del usuario eliminado
      const result = await userService.deletedUser(id, userID)
      if(!result.success) return res.status(result.status).json({ error: result.error})
      return res.status(result.status).json(result.data)
    } 
    catch (error){
      return res.status(500).json({ error: "internal server error." })
    }
  }
}