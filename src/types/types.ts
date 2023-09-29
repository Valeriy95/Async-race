export interface IElement {
    returnElement(): HTMLElement;
    appendTo(parentElement: HTMLElement): void;
    addClass(className: string): void;
    removeClass(className: string): void;
    hasClass(className: string): boolean;
    toggleClass(className: string): void;
    nameClass(): string;
    removeСontent(): void;
    returnHTML(): string;
    deleteChild(): void; 
    changeWidth(num: string): void;
}

export interface IElementInput extends IElement {
    returnInput(): HTMLInputElement;
    getValue(): string;
    deleteValue(): void;
    setValue(str: string): void;
    disabled(attr: string): void; 
}

export interface INewCar {
    name: string;
    color: string;
}

export interface ICar {
    name: string;
    color: string;
    id: number;
}

type EmptyObject = Record<string, never>;

export type CarResponse = ICar | EmptyObject | undefined;

export type ButtonSelect = Element | undefined | null;

export interface ICarData {
    cars: ICar[];
    totalCount: string;
}

export interface IParams {
    id: string;
    status: string;
}

export type AnimationIds = {
    [key: string]: number;
};

export interface IData {
    velocity: number;
    distance: number;
}

export interface IDataStartEngine {
    success: boolean;
}

export interface IWinnerData {
    id: number;
    wins: number;
    time: number;
}

export interface IUpdateWinner {
    wins: number;
    time: number;
}

export interface IGetWinners {
    totalCount: string;
    data: IWinnerData[];
}