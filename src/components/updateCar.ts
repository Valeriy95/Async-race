import { ICar } from "../types/types";

export async function updateCar(id: number, name: string, color: string): Promise<ICar | undefined> {
    try {
      const url: string = `../netlify/functions/myFunctions/garage/${id}`;
      const data: ICar = {
        name: name,
        color: color,
        id: id,
      };
      const response: Response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        const updatedCar = await response.json();
        return updatedCar;
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      throw new Error(`Request failed: ${error}`);
    }
}