import { Router } from "express";
import { authController } from "../controllers/auth.js";

const authRouter = Router()

//Ruta pública
authRouter.post('/login', authController.login)


export default authRouter