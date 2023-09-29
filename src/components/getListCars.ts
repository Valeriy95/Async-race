import { ICar } from "../types/types";

export let allPages: number;
export let allСars: number;

export async function getListCars(page: number): Promise<ICar[]> {
    try {
      let url = '../netlify/functions/myFunctions/garage';
      if (page) {
        url += `?_page=${page}&_limit=7`;
      }
      const response = await fetch(url, {
        method: 'GET',
      });
  
      if (response.ok) {
        const totalCount: string = <string>response.headers.get('X-Total-Count');
        const arrCar: ICar[] = await response.json();
        allPages = Math.ceil(+totalCount / 7);
        allСars = +totalCount;
        return arrCar;
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      throw new Error(`Request failed: ${error}`);
    }
  }