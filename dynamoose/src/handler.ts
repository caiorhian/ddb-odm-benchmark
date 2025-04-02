import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import "./dynamodb.provider";
import { HouseService } from "./services/house-service";

const houseService = new HouseService();

export const benchmark = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const count = event.queryStringParameters?.count
      ? parseInt(event.queryStringParameters.count, 10)
      : 10;

    const iterations = event.queryStringParameters?.iterations
      ? parseInt(event.queryStringParameters.iterations, 10)
      : 1;

    const shouldReturnBody = event.queryStringParameters?.returnBody === "true";
    const shouldPrepareBenchmark =
      event.queryStringParameters?.prepareBenchmark === "true";

    if (shouldPrepareBenchmark) {
      houseService.prepareBenchmark(count);
    }

    const houses = await houseService.benchmark(iterations);

    if (shouldReturnBody) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          count: houses.length,
          houses: houses,
        }),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({
          count: houses.length,
        }),
      };
    }
  } catch (error) {
    console.error("Error in benchmark function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};
