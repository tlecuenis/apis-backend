import { Router } from "express";
import { userController } from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";
import { verifySuperAdmin } from "../middleware/superAdmin.js";

const userRouter = Router()

userRouter.get("/", verifyToken, userController.getAllUsers)
userRouter.post("/", verifySuperAdmin, userController.createUser)
userRouter.patch("/:id", verifySuperAdmin, userController.updateUser)
userRouter.post("/:id", verifySuperAdmin, userController.deletedUserByID)


export default userRouter