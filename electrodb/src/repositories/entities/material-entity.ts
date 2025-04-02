import { Attribute } from "electrodb";

export const MaterialAttribute = {
  type: "map",
  properties: {
    id: { type: "string", required: true },
    name: { type: "string", required: true },
    type: {
      type: [
        "Wood",
        "Metal",
        "Plastic",
        "Glass",
        "Fabric",
        "Leather",
        "Stone",
        "Composite",
      ] as const,
      required: true,
    },
    color: { type: "string", required: true },
    recyclable: { type: "boolean", required: true },
    strength: { type: "number", required: true },
    weight: { type: "number", required: true },
    manufacturer: { type: "string" },
    manufactureDate: { type: "number" },
    specifications: { type: "any" },
  },
} satisfies Attribute;
