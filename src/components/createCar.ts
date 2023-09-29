import { ICar, INewCar } from "../types/types";
import { setAmountCars } from "./pages/garage/garage";

export async function createCar(car: INewCar): Promise<ICar> {
    if(car.color === '') {
        car.color = '#000000';
    }
    try {
        const response: Response = await fetch('../netlify/functions/myFunctions/garage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car),
        });
        const createdCar: ICar = await response.json();
        setAmountCars();
        return createdCar;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
