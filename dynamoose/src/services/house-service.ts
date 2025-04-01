import * as fs from "fs";
import * as path from "path";
import { createFixture } from "zod-fixture";
import { HouseRepository } from "../repositories/house-repository";
import { FurniturePartSchema } from "../schemas/furniture-part";
import { House, HouseSchema } from "../schemas/house";

export class HouseService {
  public generateHouse(seed: number): House {
    return createFixture(HouseSchema, {
      seed,
    });
  }

  public generateHouses(count: number): House[] {
    const houses: House[] = [];

    for (let i = 0; i < count; i++) {
      houses.push(this.generateHouse(i));
    }

    return houses;
  }

  public async benchmark(
    count: number,
    iterations: number = 1
  ): Promise<House[]> {
    const seedPath = path.join(__dirname, "houses_seed.json");
    const fileContent = fs.readFileSync(seedPath, "utf-8");
    const houses: House[] = HouseSchema.array().parse(JSON.parse(fileContent));
    const houseRepo = new HouseRepository();

    for (let iter = 0; iter < iterations; iter++) {
      console.log(`Iteration ${iter + 1}`);

      console.time("write time");
      for (const house of houses) {
        await houseRepo.create(house);
      }
      console.timeEnd("write time");

      console.time("read time");
      const housesFound = await houseRepo.getAll();
      console.timeEnd("read time");

      console.time("update time");
      for (const house of houses) {
        house.rooms = house.rooms.map((room) => ({
          ...room,
          furniture: room.furniture.map((furniture) => ({
            ...furniture,
            parts: [...furniture.parts, createFixture(FurniturePartSchema)],
          })),
        }));
        await houseRepo.update(house.id, house);
      }
      console.timeEnd("update time");

      console.time("delete time");
      for (const house of houses) {
        await houseRepo.delete(house.id);
      }
      console.timeEnd("delete time");
    }

    return houses;
  }

  public prepareBenchmark(count: number): House[] {
    let houses: House[] = [];

    houses = this.generateHouses(count);

    const seedPath = path.join(__dirname, "houses_seed.json");
    fs.writeFileSync(seedPath, JSON.stringify(houses, null, 4), "utf-8");

    return houses;
  }
}
