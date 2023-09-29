import { IGetWinners, IWinnerData } from "../types/types";

export let allPagesWinners: number;

export async function getWinners(page: number, limit: string, sort: string, order: string): Promise<IGetWinners | undefined> {  
    let url: string = '../netlify/functions/myFunctions/winners';
    const params: string[] = [];
 
    if (page){
        params.push(`_page=${page}`);
    }
    if (limit){
        params.push(`_limit=${limit}`);
    }
    if (sort){
        params.push(`_sort=${sort}`);
    }  
    if (order){
        params.push(`_order=${order}`);
    }    
    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }
  
    try {
        const response: Response = await fetch(url);
        if (response.ok) {
            const data: IWinnerData[] = await response.json();
            const totalCount: string = <string>response.headers.get('X-Total-Count');
            allPagesWinners = Math.ceil(+totalCount / 10);
            return { totalCount, data }
        } else {
            console.log(`Error: ${response.status}`)
        }
    } catch (error) {
        throw new Error(`Request failed: ${error}`);
    }
}