import * as dynamoose from "dynamoose";

export class DynamoDbProvider {
  constructor() {
    this.initialize();
  }

  private initialize(): void {
    if (process.env.IS_OFFLINE === "true" || process.env.IS_LOCAL === "true") {
      console.log("Using local DynamoDB instance");
      dynamoose.aws.ddb.local();
    }

    const instance = new dynamoose.aws.ddb.DynamoDB({
      region: process.env.AWS_REGION || "us-east-1",
    });

    dynamoose.Table.defaults.set({
      create: false,
      waitForActive: {
        enabled: true,
        check: {
          timeout: 10000,
          frequency: 1000,
        },
      },
    });
  }
}

export const dynamoDbProvider = new DynamoDbProvider();
