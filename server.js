import express, { json } from 'express';
import dishRouter from './routes/dish.js';
import { connectDB } from './config/db.js';

const app = express();
app.use(json())
app.disable('x-powered-by')
const PORT = process.env.PORT || 5000;

connectDB();

app.use('/dishes', dishRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});