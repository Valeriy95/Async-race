import { IElement } from "../../../types/types";
import { showViewGarage } from "../../showViewGarage";
import { paginationNext, paginationPrev, showViewWinners, sortWinners, sortWinnersTime } from "../winners/winners";
import { NewElement } from "../../class";
import './style.css'


const body: HTMLElement = <HTMLElement>document.querySelector('body');
export const container: IElement = new NewElement('div', 'container');
export const header: IElement = new NewElement('div', 'header');
export const btnToGarage: IElement = new NewElement('div', 'header_btn__garage');
export const btnToWinners: IElement = new NewElement('div', 'header_btn__winners');
export const main: IElement = new NewElement('div', 'main');
export const viewGarage: IElement = new NewElement('div', 'view_garage');
export const viewWinners: IElement = new NewElement('div', 'view_winners hidden');

export const amountWinners: IElement = new NewElement('h4', 'amount_winner');
export const numberPageWinnnes: IElement = new NewElement('h3', 'number_page_winnnes');
export const winnersContainer: IElement = new NewElement('div', 'winners_container');
export const winnersWrapperTitle: IElement = new NewElement('div', 'winners_wrapper_title');
export const winnerNumberTitle: IElement = new NewElement('p', 'winner_number_title');
export const winnerCarTitle: IElement = new NewElement('p', 'winner_car_title');
export const winnerNameTitle: IElement = new NewElement('p', 'winner_name_title');

export const winnerWinsTitleContainer: IElement = new NewElement('div', 'winner_wins_title_container');
export const winnerWinsTitle: IElement = new NewElement('p', 'winner_wins_title');
export const winnerWinsArrow: IElement = new NewElement('div', 'winner_wins_arrow hidden');

export const winnerTimeTitleContainer: IElement = new NewElement('div', 'winner_time_title_container');
export const winnerTimeTitle: IElement = new NewElement('p', 'winner_time_title');
export const winnerTimeArrow: IElement = new NewElement('div', 'winner_time_arrow hidden');

export const paginationWinners: IElement = new NewElement('div', 'pagination_winners');
export const paginationWinnersBtnPrev: IElement = new NewElement('div', 'pagination_winners__btn_prev pagination_disabled');
export const paginationWinnersBtnNext: IElement = new NewElement('div', 'pagination_winners__btn_next');
export const winnersList: IElement = new NewElement('div', 'winners_list');

export function createPage (): void {
    body.append(container.returnElement());
    header.appendTo(container.returnElement());
    btnToGarage.appendTo(header.returnElement());
    btnToGarage.returnElement().innerHTML = 'TO GARAGE';
    btnToWinners.appendTo(header.returnElement());
    btnToWinners.returnElement().innerHTML = 'TO WINNERS';
    main.appendTo(container.returnElement());
    viewGarage.appendTo(main.returnElement());
    viewWinners.appendTo(main.returnElement());
    amountWinners.appendTo(viewWinners.returnElement());
    amountWinners.returnElement().innerHTML = 'Winners (0)';
    numberPageWinnnes.appendTo(viewWinners.returnElement());
    numberPageWinnnes.returnElement().innerHTML = 'Page #1';
    winnersContainer.appendTo(viewWinners.returnElement());
    winnersWrapperTitle.appendTo(winnersContainer.returnElement());
    winnerNumberTitle.appendTo(winnersWrapperTitle.returnElement());
    winnerNumberTitle.returnElement().innerHTML = 'Number';
    winnerCarTitle.appendTo(winnersWrapperTitle.returnElement());
    winnerCarTitle.returnElement().innerHTML = 'Car';
    winnerNameTitle.appendTo(winnersWrapperTitle.returnElement());
    winnerNameTitle.returnElement().innerHTML = 'Name';
    winnerWinsTitleContainer.appendTo(winnersWrapperTitle.returnElement());
    winnerWinsTitle.appendTo(winnerWinsTitleContainer.returnElement());
    winnerWinsTitle.returnElement().innerHTML = 'Wins';
    winnerWinsArrow.appendTo(winnerWinsTitleContainer.returnElement());
    winnerTimeTitleContainer.appendTo(winnersWrapperTitle.returnElement());
    winnerTimeTitle.appendTo(winnerTimeTitleContainer.returnElement());
    winnerTimeTitle.returnElement().innerHTML = 'Best times';
    winnerTimeArrow.appendTo(winnerTimeTitleContainer.returnElement());
    winnersList.appendTo(winnersContainer.returnElement());
    paginationWinners.appendTo(viewWinners.returnElement());
    paginationWinnersBtnPrev.appendTo(paginationWinners.returnElement());
    paginationWinnersBtnNext.appendTo(paginationWinners.returnElement());
    paginationWinnersBtnPrev.returnElement().innerHTML = 'PREV';
    paginationWinnersBtnNext.returnElement().innerHTML = 'NEXT';
}

btnToGarage.returnElement().addEventListener('click', showViewGarage);
btnToWinners.returnElement().addEventListener('click', showViewWinners);

paginationWinnersBtnPrev.returnElement().addEventListener('click', paginationPrev);
paginationWinnersBtnNext.returnElement().addEventListener('click', paginationNext);

winnerWinsTitleContainer.returnElement().addEventListener('click', sortWinners);
winnerTimeTitleContainer.returnElement().addEventListener('click', sortWinnersTime);
