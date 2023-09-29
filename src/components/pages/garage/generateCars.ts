import { createCar } from "../../createCar";
import { INewCar } from "../../../types/types";
import { currentPage, drawListCars } from "./garage";

const brand: string[] = ['Toyota', 'Lexus', 'Mazda', 'Skoda', 'Opel', 'Subaru', 'Hyundai', 'Tesla', 'Man', 'Audi']; 
const model: string[] = ['Avensis', 'RX570', 'Focus', 'Octavia', 'Vectra', 'Outback', 'Y3', 'A7', 'Elantra', 'Camry'];

function getRandomNumber(): number {
    return Math.floor(Math.random() * 10);
}

function getRandomColor(): string {
    const red: number = Math.floor(Math.random() * 256);
    const green: number = Math.floor(Math.random() * 256);
    const blue: number= Math.floor(Math.random() * 256);
    const hRed: string = red.toString(16).padStart(2, '0');
    const hGreen: string = green.toString(16).padStart(2, '0');
    const hBlue: string = blue.toString(16).padStart(2, '0');
    return `#${hRed}${hGreen}${hBlue}`;
}


export function generateCars(): void {
    const oneHundredCars: number = 100;
    for( let i = 0; i < oneHundredCars; i += 1) {
        const newCar: INewCar = {
            name: '',
            color: '',
        };
        const nameNumber: number = getRandomNumber();
        const modelNumber: number = getRandomNumber();
        newCar.name = `${brand[nameNumber]} ${model[modelNumber]}`; 
        newCar.color = getRandomColor();
        createCar(newCar)
        .then(() => {
            drawListCars(currentPage);
            newCar.name = '';
        })
        .catch((error: Error) => {
            console.error('Error:', error);
        });
    }
}