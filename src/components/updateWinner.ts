import { IUpdateWinner } from "../types/types";

export async function updateWinner(id: number, wins: number, time: number): Promise<IUpdateWinner> {
    const url: string = `../netlify/functions/myFunctions/winners/${id}`;
  
    const data: IUpdateWinner = {
      wins: wins,
      time: time,
    };

    try {
      const response: Response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const responseData: IUpdateWinner = await response.json();
        return responseData;
      } else {
        throw new Error(`Error ${response.status}`);
      }

    } catch (error) {
      throw new Error(`Request failed: ${error}`);
    }
}