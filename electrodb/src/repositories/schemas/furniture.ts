import { z } from "zod";
import { FurniturePartElectroDBSchema } from "./furniture-part";

export const FurnitureElectroDBSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: z.string(),
  brand: z.string().optional(),
  model: z.string().optional(),
  purchaseDate: z.number().optional(),
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
  parts: z.array(FurniturePartElectroDBSchema),
  warranty: z
    .object({
      expiryDate: z.number().optional(),
      provider: z.string().optional(),
      terms: z.string().optional(),
    })
    .optional(),
  notes: z.string().optional(),
  lastCleaned: z.number().optional(),
  tags: z.array(z.string()).min(1).max(5).optional(),
});

export type FurnitureElectroDB = z.infer<typeof FurnitureElectroDBSchema>;
