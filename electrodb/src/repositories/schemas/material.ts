import { z } from "zod";

export const MaterialElectroDBSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: z.enum([
    "Wood",
    "Metal",
    "Plastic",
    "Glass",
    "Fabric",
    "Leather",
    "Stone",
    "Composite",
  ]),
  color: z.string(),
  recyclable: z.boolean(),
  strength: z.number().min(1).max(10),
  weight: z.number().positive(),
  manufacturer: z.string().optional(),
  manufactureDate: z.number().optional(),
  specifications: z.record(z.string()).optional(),
});

export type MaterialElectroDB = z.infer<typeof MaterialElectroDBSchema>;
