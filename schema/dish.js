import { z } from "zod"

export const dishSchema = z.object({
      categories: z.array(z.string()),
      name: z.string({
        invalid_type_error: 'El nombre del plato debe ser un string.',
        required_error: 'El nombre del plato es requerido.'
      }),
      description: z.string({
        invalid_type_error: 'El nombre del plato debe ser un string.',
        required_error: 'El nombre del plato es requerido.'
      }),
      ingredients: z.array(z.string()),
      allergens: z.array(z.string()),
      image: z.string({ required_error: 'La imagen es requerida.' }),
      price_ars: z.number().positive().min(1000),
      price_usd: z.number().positive().min(1),
})

export function validateDish (object){
  return dishSchema.safeParse(object)
}

const partialDishSchema = dishSchema.partial()

export function validatePartialDish (object){
  return partialDishSchema.safeParse(object)
}