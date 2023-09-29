import { IWinnerData } from "../types/types";

export async function getWinner(id: string): Promise<IWinnerData | undefined> {
    const url = `../netlify/functions/myFunctions/winners/${id}`;
    try {
        const response: Response = await fetch(url);
        if (response.ok) { 
            const data: IWinnerData | undefined = await response.json();
            return data;
        } else if (response.status === 404){
            console.log('Сar not found')
        } else {
            throw new Error(`Error: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Request failed: ${error}`);
    }
}