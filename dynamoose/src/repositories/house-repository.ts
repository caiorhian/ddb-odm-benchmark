import * as dynamoose from "dynamoose";
import { House, HouseSchema } from "../schemas/house";
import { BaseRepository } from "./base-repository";
import { HouseItem } from "./models/house.item";
import { houseSchema } from "./models/house.schema";

export class HouseRepository extends BaseRepository<House> {
  constructor() {
    const tableName = process.env.HOUSES_TABLE || "houses";

    super(dynamoose.model<HouseItem>(tableName, houseSchema));
  }

  /**
   * Convert from a House to a HouseItem
   */
  private toHouseItem(house: House): HouseItem {
    return house as unknown as HouseItem;
  }

  /**
   * Convert from a HouseItem to a House
   */
  private toHouse(houseItem: HouseItem): House {
    return HouseSchema.parse(houseItem);
  }
}

// Create a singleton instance
export const houseRepository = new HouseRepository();
