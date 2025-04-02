import { z } from "zod";
import { RoomSchema } from "./room";

export const HouseSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    country: z.string(),
    coordinates: z
      .object({
        latitude: z.number(),
        longitude: z.number(),
      })
      .optional(),
  }),
  constructionYear: z.number().int().positive(),
  squareFootage: z.number().positive(),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().positive(),
  floors: z.number().int().min(1),
  propertyType: z.enum([
    "Single Family",
    "Townhouse",
    "Apartment",
    "Condo",
    "Mobile",
    "Other",
  ]),
  lotSize: z.number().positive().optional(),
  rooms: z.array(RoomSchema).length(20),
  exterior: z.object({
    material: z.string(),
    color: z.string(),
    roofType: z.string(),
    condition: z.enum(["Excellent", "Good", "Fair", "Poor"]),
  }),
  utilities: z.object({
    heating: z.string(),
    cooling: z.string(),
    waterHeater: z.string(),
    electricalSystem: z.string(),
  }),
  features: z.array(z.string()).min(1).max(5).optional(),
  garage: z
    .object({
      attached: z.boolean(),
      capacity: z.number().int().min(0),
      type: z.string().optional(),
    })
    .optional(),
  yearPurchased: z.number().int().optional(),
  purchasePrice: z.number().positive().optional(),
  currentValue: z.number().positive().optional(),
  lastRenovated: z.coerce.date().optional(),
  insuranceDetails: z
    .object({
      provider: z.string(),
      policyNumber: z.string(),
      coverage: z.number().positive(),
      expirationDate: z.coerce.date(),
    })
    .optional(),
  notes: z.string().optional(),
  images: z.array(z.string().url()).min(1).max(5).optional(),
});

export type House = z.infer<typeof HouseSchema>;
