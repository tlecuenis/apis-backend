import { Router } from 'express';
import { DishController } from '../controllers/dish.js';
import { verifyToken } from '../middleware/auth.js';

export const dishRouter = Router();

// --- RUTAS PÚBLICAS (USUARIOS) ---
dishRouter.get('/', DishController.getAll);
dishRouter.get('/:id', DishController.getByID);

// --- RUTAS PROTEGIDAS (ADMIN) ---
dishRouter.post('/', verifyToken, DishController.createDish);
dishRouter.patch('/:id', verifyToken, DishController.updateDish);
dishRouter.delete('/:id', verifyToken, DishController.deleteByID);


export default dishRouter;