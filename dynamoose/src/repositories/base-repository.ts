import { Model } from "dynamoose/dist/Model";
import { v4 as uuidv4 } from "uuid";

export abstract class BaseRepository<
  T extends { id: string; createdAt?: Date; updatedAt?: Date }
> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  /**
   * Get an item by its id
   * @param id The id of the item to get
   */
  async getById(id: string): Promise<T | null> {
    try {
      const item = await this.model.get(id);
      return item ?? null;
    } catch (error) {
      console.error(`Error getting item by id ${id}:`, error);
      throw error;
    }
  }

  /**
   * Create a new item
   * @param item The item to create
   */
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

  /**
   * Create multiple items in batch
   * @param items Array of items to create
   */
  async batchCreate(items: T[]): Promise<T[]> {
    try {
      // Assign UUIDs to items without IDs
      const itemsWithIds = items.map((item) => {
        if (!item.id) {
          item.id = uuidv4();
        }
        return item;
      });

      // Batch create items (25 is the max batch size for DynamoDB)
      const results: T[] = [];
      for (let i = 0; i < itemsWithIds.length; i += 25) {
        const batch = itemsWithIds.slice(i, i + 25);
        const batchResults = await this.model.batchPut(batch);
        results.push(...(batchResults as T[]));
      }

      return results;
    } catch (error) {
      console.error("Error batch creating items:", error);
      throw error;
    }
  }

  /**
   * Update an existing item
   * @param id The id of the item to update
   * @param item The updated item data
   */
  async update(id: string, item: Partial<T>): Promise<T | null> {
    try {
      // Ensure the id is not changed
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

  /**
   * Delete an item by its id
   * @param id The id of the item to delete
   */
  async delete(id: string): Promise<void> {
    try {
      await this.model.delete(id);
    } catch (error) {
      console.error(`Error deleting item ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get all items
   */
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

  /**
   * Query items by a specific attribute
   * @param attribute The attribute to query by
   * @param value The value to match
   */
  async query<K extends keyof T>(attribute: K, value: T[K]): Promise<T[]> {
    try {
      const query = await this.model
        .query(attribute as string)
        .eq(value)
        .exec();
      return query.toArray() as T[];
    } catch (error) {
      console.error(`Error querying by ${String(attribute)}:`, error);
      throw error;
    }
  }
}
