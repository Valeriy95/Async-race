import { IDataStartEngine } from "../types/types";
import { animationIds } from "./pages/garage/garage";

export async function switchEngineToDrive(carId: string): Promise<IDataStartEngine> {
  
    const url: string = `../netlify/functions/myFunctions/engine?id=${carId}&status=drive`;
  
    try {
      const response: Response = await fetch(url, {
        method: "PATCH"
      });
  
      const data: IDataStartEngine = await response.json();
      if (response.ok) {
        return data;
      } else if (response.status === 400) {
        throw new Error("Wrong parameters: 'id' should be any positive number, 'status' should be 'started', 'stopped' or 'drive'");
      } else if (response.status === 404) {
        throw new Error("Engine parameters for car with such id was not found in the garage. Have you tried to set engine status to 'started' before?");
      } else if (response.status === 429) {
        throw new Error("Drive already in progress. You can't run drive for the same car twice while it's not stopped.");
      } else if (response.status === 500) {
        throw new Error("Car has been stopped suddenly. Its engine was broken down.");
      } else {
        throw new Error("Unknown error occurred.");
      }
    } catch (error) {
      cancelAnimationFrame(animationIds[carId]);
      throw new Error(`Request failed: ${error}`);
    }
  }
