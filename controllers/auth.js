import * as userServices from '../services/user.js'


export class authController{
  
  static async login(req, res){
    try{
      const {username, password} = req.body
      const result = await userServices.userLogIn({ username, password })

      if(!result.success) return res.status(result.status).json({error: result.error}) 
      
      return res.status(result.status).json(result.data)
    }
    catch (error){
      return res.status(500).json(error.message)
    }
  }
}