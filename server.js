import express, { json } from 'express';
import dishRouter from './routes/dish.js';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import { connectDB } from './config/db.js';
import cors from 'cors'

const app = express();
app.use(json())
app.use(cors())
app.disable('x-powered-by')
const PORT = process.env.PORT || 5000;

connectDB();

app.use('/dishes', dishRouter);
app.use('/users', userRouter)
app.use('/auth', authRouter)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});