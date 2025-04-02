import { z } from "zod";
import { FurniturePartSchema } from "./furniture-part";

export const FurnitureSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: z.string(),
  brand: z.string().optional(),
  model: z.string().optional(),
  purchaseDate: z.coerce.date().optional(),
  price: z.number().positive().optional(),
  dimensions: z.object({
    length: z.number().positive(),
    width: z.number().positive(),
    height: z.number().positive(),
    unit: z.enum(["cm", "inch", "m"]),
  }),
  color: z.string(),
  material: z.string(),
  condition: z.enum(["New", "Excellent", "Good", "Fair", "Poor"]),
  parts: z.array(FurniturePartSchema).min(1).max(3),
  warranty: z
    .object({
      expiryDate: z.coerce.date().optional(),
      provider: z.string().optional(),
      terms: z.string().optional(),
    })
    .optional(),
  notes: z.string().optional(),
  lastCleaned: z.coerce.date().optional(),
  tags: z.array(z.string()).min(1).max(5).optional(),
});

export type Furniture = z.infer<typeof FurnitureSchema>;
