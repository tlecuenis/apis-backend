import { Router } from 'express';
import { DishController } from '../controllers/dish.js';

export const dishRouter = Router();


dishRouter.get('/', DishController.getAll);
dishRouter.get('/category/:category', DishController.getByCategory);
dishRouter.get('/:id', DishController.getByID);


// --- RUTAS PROTEGIDAS (ADMIN) ---
dishRouter.post('/', DishController.createDish);


dishRouter.put('/:id', async (req, res) => {
    
});


dishRouter.delete('/:id', async (req, res) => {
    
});


export default dishRouter;