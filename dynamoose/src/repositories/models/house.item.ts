import { Item } from "dynamoose/dist/Item";
import { House } from "../../schemas/house";
import { Room } from "../../schemas/room";

export class HouseItem extends Item implements House {
  id!: string;
  createdAt!: Date;
  updatedAt!: Date;
  address!: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  constructionYear!: number;
  squareFootage!: number;
  bedrooms!: number;
  bathrooms!: number;
  floors!: number;
  propertyType!:
    | "Single Family"
    | "Townhouse"
    | "Apartment"
    | "Condo"
    | "Mobile"
    | "Other";
  lotSize?: number;
  rooms!: Room[];
  exterior!: {
    material: string;
    color: string;
    roofType: string;
    condition: "Excellent" | "Good" | "Fair" | "Poor";
  };
  utilities!: {
    heating: string;
    cooling: string;
    waterHeater: string;
    electricalSystem: string;
  };
  features?: string[];
  garage?: {
    attached: boolean;
    capacity: number;
    type?: string;
  };
  yearPurchased?: number;
  purchasePrice?: number;
  currentValue?: number;
  lastRenovated?: Date;
  insuranceDetails?: {
    provider: string;
    policyNumber: string;
    coverage: number;
    expirationDate: Date;
  };
  notes?: string;
  images?: string[];
}
