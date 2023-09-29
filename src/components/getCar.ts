import { CarResponse } from "../types/types";

export async function getCar (id:string): Promise<CarResponse> {
    try {
        const response = await fetch(`../netlify/functions/myFunctions/garage/${id}`, {
            method: 'GET',
        }); 
        if (response.ok) {
            const car = await response.json();
            return car;
        } else if (response.status === 404) {
            return {};
        } else {
            throw new Error(`Error: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Request failed: ${error}`);
    }
}
  