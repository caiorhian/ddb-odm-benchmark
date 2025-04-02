import { Entity } from "electrodb";
import { client } from "../db-config";
import { RoomAttribute } from "./room-entity";

export const HouseEntity = new Entity(
  {
    model: {
      entity: "House",
      version: "1",
      service: "DDB-ODB-Benchmark",
    },
    attributes: {
      id: {
        type: "string",
        required: true,
      },
      createdAt: {
        type: "number",
        readOnly: true,
        required: true,
        default: () => Date.now(),
        set: () => Date.now(),
      },
      updatedAt: {
        type: "number",
        watch: "*",
        required: true,
        default: () => Date.now(),
        set: () => Date.now(),
      },
      address: {
        type: "map",
        properties: {
          street: { type: "string", required: true },
          city: { type: "string", required: true },
          state: { type: "string", required: true },
          zipCode: { type: "string", required: true },
          country: { type: "string", required: true },
          coordinates: {
            type: "map",
            properties: {
              latitude: { type: "number" },
              longitude: { type: "number" },
            },
          },
        },
        required: true,
      },
      constructionYear: { type: "number", required: true },
      squareFootage: { type: "number", required: true },
      bedrooms: { type: "number", required: true },
      bathrooms: { type: "number", required: true },
      floors: { type: "number", required: true },
      propertyType: {
        type: [
          "Single Family",
          "Townhouse",
          "Apartment",
          "Condo",
          "Mobile",
          "Other",
        ] as const,
        required: true,
      },
      lotSize: { type: "number" },
      rooms: {
        type: "list",
        items: RoomAttribute,
        required: true,
      },
      exterior: {
        type: "map",
        properties: {
          material: { type: "string", required: true },
          color: { type: "string", required: true },
          roofType: { type: "string", required: true },
          condition: {
            type: ["Excellent", "Good", "Fair", "Poor"] as const,
            required: true,
          },
        },
        required: true,
      },
      utilities: {
        type: "map",
        properties: {
          heating: { type: "string", required: true },
          cooling: { type: "string", required: true },
          waterHeater: { type: "string", required: true },
          electricalSystem: { type: "string", required: true },
        },
        required: true,
      },
      features: { type: "list", items: { type: "string" } },
      garage: {
        type: "map",
        properties: {
          attached: { type: "boolean" },
          capacity: { type: "number" },
          type: { type: "string" },
        },
      },
      yearPurchased: { type: "number" },
      purchasePrice: { type: "number" },
      currentValue: { type: "number" },
      lastRenovated: { type: "number" },
      insuranceDetails: {
        type: "map",
        properties: {
          provider: { type: "string" },
          policyNumber: { type: "string" },
          coverage: { type: "number" },
          expirationDate: { type: "number" },
        },
      },
      notes: { type: "string" },
      images: { type: "list", items: { type: "string" } },
    },
    indexes: {
      primary: {
        pk: {
          field: "id",
          composite: ["id"],
        },
      },
    },
  },
  { client, table: process.env.HOUSES_TABLE || "houses" }
);
