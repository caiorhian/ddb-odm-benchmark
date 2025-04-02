import { Model } from "dynamoose/dist/Model";
import { v4 as uuidv4 } from "uuid";

export abstract class BaseRepository<
  T extends { id: string; createdAt?: Date; updatedAt?: Date }
> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(item: T): Promise<T> {
    try {
      item.id = uuidv4();
      const result = await this.model.create(item);
      return result as T;
    } catch (error) {
      console.error("Error creating item:", error);
      throw error;
    }
  }

  async update(id: string, item: Partial<T>): Promise<T | null> {
    try {
      const updateData = { ...item };
      delete updateData.id;
      delete updateData.createdAt;
      delete updateData.updatedAt;

      const result = await this.model.update({ id }, updateData);
      return result as T;
    } catch (error) {
      console.error(`Error updating item ${id}:`, error);
      throw error;
    }
  }
  async delete(id: string): Promise<void> {
    try {
      await this.model.delete(id);
    } catch (error) {
      console.error(`Error deleting item ${id}:`, error);
      throw error;
    }
  }

  async getAll(): Promise<T[]> {
    try {
      const response = await this.model.scan().exec();

      if (!response) {
        return [];
      }

      return response;
    } catch (error) {
      console.error("Error getting all items:", error);
      throw error;
    }
  }
}
