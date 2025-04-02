import { Attribute } from "electrodb";
import { FurniturePartAttribute } from "./furniture-part-entity";

export const FurnitureAttribute = {
  type: "map",
  properties: {
    id: { type: "string", required: true },
    name: { type: "string", required: true },
    type: { type: "string", required: true },
    brand: { type: "string" },
    model: { type: "string" },
    purchaseDate: { type: "number" },
    price: { type: "number" },
    dimensions: {
      type: "map",
      properties: {
        length: { type: "number", required: true },
        width: { type: "number", required: true },
        height: { type: "number", required: true },
        unit: { type: ["cm", "inch", "m"] as const, required: true },
      },
      required: true,
    },
    color: { type: "string", required: true },
    material: { type: "string", required: true },
    condition: {
      type: ["New", "Excellent", "Good", "Fair", "Poor"] as const,
      required: true,
    },
    parts: {
      type: "list",
      items: FurniturePartAttribute,
      required: true,
    },
    warranty: {
      type: "map",
      properties: {
        expiryDate: { type: "number" },
        provider: { type: "string" },
        terms: { type: "string" },
      },
    },
    notes: { type: "string" },
    lastCleaned: { type: "number" },
    tags: { type: "list", items: { type: "string" } },
  },
} satisfies Attribute;
