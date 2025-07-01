import { Router } from 'express';
import { DishController } from '../controllers/dish.js';

export const dishRouter = Router();

// --- RUTAS PÚBLICAS (USUARIOS) ---
dishRouter.get('/', DishController.getAll);
dishRouter.get('/:id', DishController.getByID);

// --- RUTAS PROTEGIDAS (ADMIN) ---
dishRouter.post('/', DishController.createDish);
dishRouter.patch('/:id', DishController.updateDish);
dishRouter.delete('/:id', DishController.deleteByID);


export default dishRouter;