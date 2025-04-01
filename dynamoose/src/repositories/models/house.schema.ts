import * as dynamoose from "dynamoose";
import { roomSchema } from "./room.schema";
import "../../dynamodb.provider";

export const houseSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      required: true,
    },
    address: {
      type: Object,
      schema: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
        coordinates: {
          type: Object,
          schema: {
            latitude: Number,
            longitude: Number,
          },
          required: false,
        },
      },
    },
    constructionYear: {
      type: Number,
      required: true,
    },
    squareFootage: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    floors: {
      type: Number,
      required: true,
    },
    propertyType: {
      type: String,
      enum: [
        "Single Family",
        "Townhouse",
        "Apartment",
        "Condo",
        "Mobile",
        "Other",
      ],
    },
    lotSize: {
      type: Number,
      required: false,
    },
    rooms: {
      type: Array,
      schema: [roomSchema],
      required: true,
    },
    exterior: {
      type: Object,
      schema: {
        material: String,
        color: String,
        roofType: String,
        condition: {
          type: String,
          enum: ["Excellent", "Good", "Fair", "Poor"],
        },
      },
    },
    utilities: {
      type: Object,
      schema: {
        heating: String,
        cooling: String,
        waterHeater: String,
        electricalSystem: String,
      },
    },
    features: {
      type: Array,
      schema: [String],
      required: false,
    },
    garage: {
      type: Object,
      schema: {
        attached: Boolean,
        capacity: Number,
        type: {
          type: String,
          required: false,
        },
      },
      required: false,
    },
    yearPurchased: {
      type: Number,
      required: false,
    },
    purchasePrice: {
      type: Number,
      required: false,
    },
    currentValue: {
      type: Number,
      required: false,
    },
    lastRenovated: {
      type: Date,
      required: false,
    },
    insuranceDetails: {
      type: Object,
      schema: {
        provider: String,
        policyNumber: String,
        coverage: Number,
        expirationDate: Date,
      },
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
    images: {
      type: Array,
      schema: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
