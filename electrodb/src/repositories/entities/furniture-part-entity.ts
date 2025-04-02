import { Attribute } from "electrodb";
import { MaterialAttribute } from "./material-entity";

export const FurniturePartAttribute = {
  type: "map",
  properties: {
    id: { type: "string", required: true },
    name: { type: "string", required: true },
    material: {
      ...MaterialAttribute,
      required: true,
    },
    dimensions: {
      type: "map",
      properties: {
        length: { type: "number", required: true },
        width: { type: "number", required: true },
        height: { type: "number", required: true },
        unit: {
          type: ["cm", "inch", "mm", "m"] as const,
          required: true,
        },
      },
      required: true,
    },
    weight: { type: "number", required: true },
    replacementCost: { type: "number" },
    manufacturingDetails: {
      type: "map",
      properties: {
        serialNumber: { type: "string" },
        manufacturer: { type: "string" },
        dateProduced: { type: "number" },
        batchNumber: { type: "string" },
      },
    },
    condition: {
      type: ["New", "Excellent", "Good", "Fair", "Poor"] as const,
      required: true,
    },
    lastMaintenance: { type: "number" },
  },
} satisfies Attribute;
