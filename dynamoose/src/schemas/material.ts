import { z } from "zod";

export const MaterialSchema = z.object({
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
  manufactureDate: z.coerce.date().optional(),
  specifications: z.record(z.string()).optional(),
});

export type Material = z.infer<typeof MaterialSchema>;
