import { ICar } from "../types/types";

export async function getAmountCars(): Promise<number> {
    try {
        const response: Response = await fetch('../netlify/functions/myFunctions/garage');
        const allCars: ICar[] = await response.json();
        return allCars.length;
    } catch (error) {
        throw new Error(`Request failed: ${error}`);
    }
}