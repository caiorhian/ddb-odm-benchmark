import { z } from "zod";
import { MaterialElectroDBSchema } from "./material";

export const FurniturePartElectroDBSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  material: MaterialElectroDBSchema,
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
      dateProduced: z.number(),
      batchNumber: z.string().optional(),
    })
    .optional(),
  condition: z.enum(["New", "Excellent", "Good", "Fair", "Poor"]),
  lastMaintenance: z.number().optional(),
});

export type FurniturePartElectroDB = z.infer<
  typeof FurniturePartElectroDBSchema
>;
