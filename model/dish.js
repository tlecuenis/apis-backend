import mongoose from 'mongoose';

const DishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  ingredients: [String],
  allergens: [String],
  image: String,
  price_ars: Number,
  price_usd: Number,
  categories: [String],
  deleted: {type: Boolean, default: false},
  deletedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null}
});

export const Dish = mongoose.model('Dish', DishSchema);
