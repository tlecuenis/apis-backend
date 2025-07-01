import { User } from "../model/user.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import mongoose from "mongoose"


export async function userLogIn({ username, password }){
  const user = await User.findOne({ username })
  if(!user) return {success: false, error: "No existe el usuario.", status: 401}

  const validPassword = bcrypt.compareSync(password, user.password)
  if(!validPassword) return {success: false, error: 'Contraseña incorrecta', status: 401}

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  return {success: true, data:{token, username: user.username}, status: 200}
}


export async function createUser({ username, password, email }){
    try{
        const existeUser = await User.findOne({ username })//.select('-password')
        if(existeUser) return {success: false, error: "El usuario ya existe", status: 409}
        const newUser = {
          username: username,
          password: bcrypt.hashSync(password, 10),
          email: email
        }
        const user = await User.create(newUser)
        if(!user) return {success: false, error: "Error creando el usuario", status: 400}
        return {success: true, data: user, status: 201}
    }
    catch (error){
      console.error(error)
      return {success: false, error: "internal server error", status: 500}
    }
}


//Hacer que no te devuelva la contraseña
export async function getAllUsers(){
  try{
    const users = await User.find()
    if(users.lenght <= 0) return {success: false, error: 'No hay usuarios', status: 404}
    return {success: true, data: users, status: 200}
  }
  catch (error){
    return {success: false, error: "internal server error", status: 500}
  }
}


export async function updateUser(id, updates) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, error: 'ID inválido.', status: 400 }
    }

    if (updates.password) {
      updates.password = bcrypt.hashSync(updates.password, 10)
    }

    if (updates.username) {
      const existeUser = await User.findOne({
        username: updates.username,
        _id: { $ne: id }
      })
      if (existeUser) {
        return { success: false, error: "Ya existe un usuario con ese nombre.", status: 409 }
      }
    }

    if (updates.email) {
      const existeMail = await User.findOne({
        email: updates.email,
        _id: { $ne: id }
      })
      if (existeMail) {
        return { success: false, error: "Ya existe un usuario con ese email.", status: 409 }
      }
    }

    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    })

    if (!user) {
      return { success: false, error: "No se encontró el usuario.", status: 404 }
    }

    return { success: true, data: user, status: 201 }

  } catch (error) {
    console.error(error)
    return { success: false, error: "Internal server error", status: 500 }
  }
}


export async function deletedUser(id, userID){
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { success: false, error: 'ID inválido.', status: 400 };
  }

  try {
    const user = await User.findByIdAndUpdate(id, {
      deleted: true,
      deletedBy: userID,
      deletedAt: new Date()
    }, { new: true });

    if (!user) return { success: false, error: 'Usuario no encontrado.', status: 404 };
    return { success: true, data: user, status: 200 };

  } catch (error) {
    console.error(error)
    return { success: false, error: error.message, status: 500 };
  }
}