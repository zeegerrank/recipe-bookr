import { z } from "zod";

export const UnitEnum = z.enum([
  "g",
  "kg",
  "ml",
  "l",
  "tsp",
  "tbsp",
  "cup",
  "fl_oz",
]);

// POST /api/ingredients
export const ingredientCreateValidator = z.object({
  id: z.string().min(1).max(64),
  name: z.string().min(1).max(64),
  gPerMl: z.number().positive(),
  defaultUnit: UnitEnum,
});

// PATCH
export const ingredientUpdateValidator = z.object({
  name: z.string().min(1).max(64),
  gPerMl: z.number().positive(),
  defaultUnit: UnitEnum,
});
