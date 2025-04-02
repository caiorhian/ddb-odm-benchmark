import { z } from "zod";
import { FurnitureElectroDBSchema } from "./furniture";

export const RoomElectroDBSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: z.enum([
    "Living",
    "Bedroom",
    "Kitchen",
    "Bathroom",
    "Dining",
    "Office",
    "Garage",
    "Attic",
    "Basement",
    "Other",
  ]),
  floor: z.number().int().min(0),
  dimensions: z.object({
    length: z.number().positive(),
    width: z.number().positive(),
    height: z.number().positive(),
    area: z.number().positive(),
    unit: z.enum(["m", "ft"]),
  }),
  windows: z.number().int().min(0),
  furniture: z.array(FurnitureElectroDBSchema),
  wallColor: z.string(),
  flooringType: z.enum([
    "Hardwood",
    "Carpet",
    "Tile",
    "Laminate",
    "Vinyl",
    "Concrete",
    "Other",
  ]),
  ceilingType: z.enum([
    "Flat",
    "Vaulted",
    "Tray",
    "Coffered",
    "Cathedral",
    "Other",
  ]),
  lighting: z
    .array(
      z.object({
        type: z.string(),
        quantity: z.number().int().min(1),
      })
    )
    .min(1)
    .max(3),
  features: z.array(z.string()).min(1).max(5).optional(),
  lastRenovated: z.number().optional(),
  conditionRating: z.number().min(1).max(10).optional(),
});

export type RoomElectroDB = z.infer<typeof RoomElectroDBSchema>;
