import * as dynamoose from "dynamoose";

// Schema for the lighting objects in a room
const lightingSchema = new dynamoose.Schema({
  type: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// Schema for the dimensions of furniture or rooms
const dimensionsSchema = new dynamoose.Schema({
  length: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    enum: ["m", "ft"],
    required: true,
  },
});

// Schema for material used in furniture parts
const materialSchema = new dynamoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: [
      "Wood",
      "Metal",
      "Plastic",
      "Glass",
      "Fabric",
      "Leather",
      "Stone",
      "Composite",
    ],
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  recyclable: {
    type: Boolean,
    required: true,
  },
  strength: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  manufacturer: String,
  manufactureDate: Date,
  specifications: {
    type: Object,
    required: false,
  },
});

// Schema for furniture part dimensions
const furniturePartDimensionsSchema = new dynamoose.Schema({
  length: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    enum: ["cm", "inch", "mm", "m"],
    required: true,
  },
});

// Schema for manufacturing details of furniture parts
const manufacturingDetailsSchema = new dynamoose.Schema({
  serialNumber: String,
  manufacturer: {
    type: String,
    required: true,
  },
  dateProduced: {
    type: Date,
    required: true,
  },
  batchNumber: String,
});

// Schema for furniture parts
const furniturePartSchema = new dynamoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  material: {
    type: Object,
    schema: materialSchema,
    required: true,
  },
  dimensions: {
    type: Object,
    schema: furniturePartDimensionsSchema,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  replacementCost: Number,
  manufacturingDetails: manufacturingDetailsSchema,
  condition: {
    type: String,
    enum: ["New", "Excellent", "Good", "Fair", "Poor"],
    required: true,
  },
  lastMaintenance: Date,
});

// Schema for furniture warranty
const warrantySchema = new dynamoose.Schema({
  expiryDate: Date,
  provider: String,
  terms: String,
});

// Schema for furniture dimensions
const furnitureDimensionsSchema = new dynamoose.Schema({
  length: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    enum: ["cm", "inch", "m"],
    required: true,
  },
});

// Schema for furniture in a room
const furnitureSchema = new dynamoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  brand: String,
  model: String,
  purchaseDate: Date,
  price: Number,
  dimensions: {
    type: Object,
    schema: furnitureDimensionsSchema,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    enum: ["New", "Excellent", "Good", "Fair", "Poor"],
    required: true,
  },
  parts: {
    type: Array,
    schema: [furniturePartSchema],
    required: true,
  },
  warranty: warrantySchema,
  notes: String,
  lastCleaned: Date,
  tags: {
    type: Array,
    schema: [String],
  },
});

// Main room schema
export const roomSchema = new dynamoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: [
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
    ],
    required: true,
  },
  floor: {
    type: Number,
    required: true,
  },
  dimensions: {
    type: Object,
    schema: dimensionsSchema,
    required: true,
  },
  windows: {
    type: Number,
    required: true,
  },
  furniture: {
    type: Array,
    schema: [furnitureSchema],
    required: true,
  },
  wallColor: {
    type: String,
    required: true,
  },
  flooringType: {
    type: String,
    enum: [
      "Hardwood",
      "Carpet",
      "Tile",
      "Laminate",
      "Vinyl",
      "Concrete",
      "Other",
    ],
    required: true,
  },
  ceilingType: {
    type: String,
    enum: ["Flat", "Vaulted", "Tray", "Coffered", "Cathedral", "Other"],
    required: true,
  },
  lighting: {
    type: Array,
    schema: [lightingSchema],
    required: true,
  },
  features: {
    type: Array,
    schema: [String],
  },
  lastRenovated: Date,
  conditionRating: Number,
});
