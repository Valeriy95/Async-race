import { deleteWinner } from "./deleteWinner";
import { setAmountCars } from "./pages/garage/garage";

export async function deleteCar(id: string) {
    try {
        const response: Response = await fetch(`../netlify/functions/myFunctions/garage/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setAmountCars();
            deleteWinner(id)
        } else if (response.status === 404) {
            console.log('Car delete');
        } else {
            console.log('Error');
        }
    } catch (error) {
        throw new Error(`Request failed: ${error}`);   
    }
}