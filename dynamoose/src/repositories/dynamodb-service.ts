import * as dynamoose from "dynamoose";
import { Item } from "dynamoose/dist/Item";

export class DynamoDbService {
  constructor() {
    this.initialize();
  }

  private initialize(): void {
    // Check if we're running locally
    if (process.env.IS_OFFLINE || process.env.IS_LOCAL) {
      // Local DynamoDB configuration
      dynamoose.aws.ddb.local("http://localhost:8000");
      console.log("Using local DynamoDB instance");
    }

    // Optional: Configure other DynamoDB settings globally
    dynamoose.aws.sdk.config.update({
      region: process.env.AWS_REGION || "us-east-1",
      // Add other AWS configurations as needed
    });

    // Configure model defaults
    dynamoose.model.defaults.set({
      create: true, // Create table if it doesn't exist
      waitForActive: {
        // Wait for table to be active
        enabled: true,
        check: {
          timeout: 10000, // 10 seconds
          frequency: 1000, // Check every second
        },
      },
    });
  }
}

// Initialize DynamoDB service as a singleton
export const dynamoDbService = new DynamoDbService();
