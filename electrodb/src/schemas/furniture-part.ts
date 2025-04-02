import { z } from "zod";
import { MaterialSchema } from "./material";

export const FurniturePartSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  material: MaterialSchema,
  dimensions: z.object({
    length: z.number().positive(),
    width: z.number().positive(),
    height: z.number().positive(),
    unit: z.enum(["cm", "inch", "mm", "m"]),
  }),
  weight: z.number().positive(),
  replacementCost: z.number().positive().optional(),
  manufacturingDetails: z
    .object({
      serialNumber: z.string().optional(),
      manufacturer: z.string(),
      dateProduced: z.coerce.date(),
      batchNumber: z.string().optional(),
    })
    .optional(),
  condition: z.enum(["New", "Excellent", "Good", "Fair", "Poor"]),
  lastMaintenance: z.coerce.date().optional(),
});

export type FurniturePart = z.infer<typeof FurniturePartSchema>;
