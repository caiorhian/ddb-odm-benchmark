import { House, HouseSchema } from "../schemas/house";
import { HouseEntity } from "./entities";
import { HouseElectroDB, HouseElectroDBSchema } from "./schemas/house";

export class HouseRepository {
  async create(item: House): Promise<House> {
    item.id = crypto.randomUUID();

    const result = await HouseEntity.create(this.toHouseItem(item)).go();
    return this.toHouse(result.data);
  }

  async update(id: string, item: House): Promise<House> {
    const houseItem = this.toHouseItem(item) as any;

    delete houseItem.id;
    delete houseItem.createdAt;
    delete houseItem.updatedAt;

    const result = await HouseEntity.patch({ id }).set(houseItem).go({
      response: "all_new",
    });

    return this.toHouse(result.data);
  }

  async delete(id: string): Promise<void> {
    await HouseEntity.delete({ id }).go();
  }

  /**
   * Get all items
   */
  async getAll(): Promise<House[]> {
    const result = await HouseEntity.scan.go();

    if (result.data.length === 0) {
      return [];
    }

    return result.data.map((item) => this.toHouse(item));
  }

  /**
   * Convert from a House to a HouseItem
   */
  private toHouseItem(house: House): HouseElectroDB {
    return HouseElectroDBSchema.parse({
      ...house,
      createdAt: house.createdAt.getTime(),
      updatedAt: house.updatedAt.getTime(),
      lastRenovated: house.lastRenovated?.getTime(),
      insuranceDetails: house.insuranceDetails
        ? {
            ...house.insuranceDetails,
            expirationDate: house.insuranceDetails?.expirationDate.getTime(),
          }
        : undefined,
      rooms: house.rooms.map((room) => ({
        ...room,
        lastRenovated: room.lastRenovated?.getTime(),
        furniture: room.furniture.map((furniture) => ({
          ...furniture,
          purchaseDate: furniture.purchaseDate?.getTime(),
          lastCleaned: furniture.lastCleaned?.getTime(),
          parts: furniture.parts.map((part) => ({
            ...part,
            material: {
              ...part.material,
              manufactureDate: part.material?.manufactureDate?.getTime(),
            },
            manufacturingDetails: part.manufacturingDetails
              ? {
                  ...part.manufacturingDetails,
                  dateProduced:
                    part.manufacturingDetails.dateProduced.getTime(),
                }
              : undefined,
            lastMaintenance: part.lastMaintenance?.getTime(),
          })),
          warranty: furniture.warranty
            ? {
                ...furniture.warranty,
                expiryDate: furniture.warranty?.expiryDate?.getTime(),
              }
            : undefined,
        })),
      })),
    });
  }

  /**
   * Convert from a HouseItem to a House
   */
  private toHouse(houseItem: object): House {
    return HouseSchema.parse(houseItem);
  }
}

// Create a singleton instance
export const houseRepository = new HouseRepository();
