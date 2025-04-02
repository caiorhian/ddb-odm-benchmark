import { Attribute } from "electrodb";
import { FurnitureAttribute } from "./furniture-entity";

export const RoomAttribute = {
  type: "map",
  properties: {
    id: { type: "string", required: true },
    name: { type: "string", required: true },
    type: {
      type: [
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
      ] as const,
      required: true,
    },
    floor: { type: "number", required: true },
    dimensions: {
      type: "map",
      properties: {
        length: { type: "number", required: true },
        width: { type: "number", required: true },
        height: { type: "number", required: true },
        area: { type: "number", required: true },
        unit: { type: ["m", "ft"] as const, required: true },
      },
      required: true,
    },
    windows: { type: "number", required: true },
    furniture: {
      type: "list",
      items: FurnitureAttribute,
      required: true,
    },
    wallColor: { type: "string", required: true },
    flooringType: {
      type: [
        "Hardwood",
        "Carpet",
        "Tile",
        "Laminate",
        "Vinyl",
        "Concrete",
        "Other",
      ] as const,
      required: true,
    },
    ceilingType: {
      type: [
        "Flat",
        "Vaulted",
        "Tray",
        "Coffered",
        "Cathedral",
        "Other",
      ] as const,
      required: true,
    },
    lighting: {
      type: "list",
      items: {
        type: "map",
        properties: {
          type: { type: "string", required: true },
          quantity: { type: "number", required: true },
        },
      },
      required: true,
    },
    features: { type: "list", items: { type: "string" } },
    lastRenovated: { type: "number" },
    conditionRating: { type: "number" },
  },
} satisfies Attribute;
