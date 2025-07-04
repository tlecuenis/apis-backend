import jwt from 'jsonwebtoken'
import { User } from '../model/user.js'

export async function verifySuperAdmin(req, res, next){
  const authHeader = req.headers['authorization']
  if(!authHeader) return res.status(401).json( {error: "Acceso denegado."} )
  const token = authHeader && authHeader.split(' ')[1]
  if(!token) return res.status(401).json( {error: "acceso denegado" })

  try{
    const user = jwt.verify(token, process.env.JWT_SECRET)
    const result = await User.findById(user.id)
    if(!result) return res.status(401).json({ error: "Usuario no encontrado." })
    
    if(!result.isSuperAdmin) return res.status(403).json( {error: "El usuario no es super admin."} )

    req.user = result
    next()
  }
  catch (error){
    return res.status(403).json( {error: "token inválido."} )
  }
}