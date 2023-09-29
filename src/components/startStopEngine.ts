import { IData } from "../types/types";

export async function startStopEngine(carId: string, status: string): Promise<IData> {
    const url: string = `../netlify/functions/myFunctions/engine?id=${carId}&status=${status}`;
  
    try {
      const response: Response = await fetch(url, {
        method: "PATCH"
      });
  
      if (response.ok) {
        const data: IData = await response.json();
        return data;
      } else if (response.status === 400) {
        throw new Error("Wrong parameters: 'id' should be any positive number, 'status' should be 'started', 'stopped' or 'drive'");
      } else if (response.status === 404) {
        throw new Error("Car with such id was not found in the garage.");
      } else {
        throw new Error("Unknown error occurred.");
      }
    } catch (error) {
      throw new Error(`Request failed: ${error}`);
    }
  }
  