import mongoose from 'mongoose';

const DishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  ingredients: [String],
  allergens: [String],
  image: String,
  price_ars: Number,
  price_usd: Number,
  categories: [String]
});

export const Dish = mongoose.model('Dish', DishSchema);
