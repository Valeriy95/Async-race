import { createListWinners } from "../../createListWinners";
import { allPagesWinners, getWinners } from "../../getWinners";
import { amountWinners, numberPageWinnnes, paginationWinnersBtnNext, paginationWinnersBtnPrev, viewGarage, viewWinners, winnerTimeArrow, winnerWinsArrow, winnersList } from "../main/main";
import { IGetWinners, IWinnerData } from "../../../types/types";

export let counterWinners: number = 0;
let currentPageWinners: number = 1;
const arrList: number[][] = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [11, 12, 13, 14, 15, 16, 17, 18, 19, 20], [21, 22, 23, 24, 25, 26, 27, 28, 29, 30], [31, 32, 33, 34, 35, 36, 37, 38, 39, 40], [41, 42, 43, 44, 45, 46, 47, 48, 49, 50], [51, 52, 53, 54, 55, 56, 57, 58, 59, 60]]
export function showViewWinners(): void {
      viewWinners.removeClass('hidden');
      viewGarage.addClass('hidden');
      winnersList.returnElement().innerHTML = ''
      counterWinners = 0
      getWinners(1, '10', 'wins', 'DESC')
      .then((response: IGetWinners | undefined) => {
         if (response?.totalCount !== undefined && (+response.totalCount) <= 10) {
            paginationWinnersBtnNext.addClass('pagination_disabled');
         } else {
            paginationWinnersBtnNext.removeClass('pagination_disabled');
         }
         amountWinners.returnElement().innerHTML = `Winners (${response?.totalCount})`;
         const winnersData: IWinnerData[] = response?.data ?? [];
         for(let i = 0; i < winnersData.length; i += 1) {
            counterWinners = arrList[0][i];
            createListWinners(winnersData[i]);
         }
      })
      .catch((error) => {
         console.error('Error getting winners:', error.message);
      });
}

export function paginationNext (): void {
   if (currentPageWinners < allPagesWinners) {
      paginationWinnersBtnPrev.removeClass('pagination_disabled');
      currentPageWinners += 1;
      getWinners(currentPageWinners, '10', 'wins', 'DESC')
      .then((winners: IGetWinners | undefined) => {
         winnersList.returnElement().innerHTML = '';
         const winnersData: IWinnerData[] = winners?.data ?? [];
         for(let i = 0; i < winnersData.length; i += 1) {
            counterWinners = arrList[currentPageWinners - 1][i];
            createListWinners(winnersData[i]);
         }
      })
    } 
   if (currentPageWinners === allPagesWinners ) {
      paginationWinnersBtnNext.addClass('pagination_disabled');
   }
   numberPageWinnnes.returnElement().innerHTML = `Page #${currentPageWinners}`;
}

export function paginationPrev (): void {
   if (currentPageWinners > 1) {
      currentPageWinners--;
      paginationWinnersBtnPrev.removeClass('pagination_disabled');
      paginationWinnersBtnNext.removeClass('pagination_disabled');
      getWinners(currentPageWinners, '10', 'wins', 'DESC')
      .then((winners: IGetWinners | undefined) => {
         winnersList.returnElement().innerHTML = '';
         const winnersData: IWinnerData[] = winners?.data ?? [];
         for(let i = 0; i < winnersData.length; i += 1) {
            counterWinners = arrList[currentPageWinners - 1][i];
            createListWinners(winnersData[i]);
         }
      })
   } 
   if (currentPageWinners === 1) {
      paginationWinnersBtnPrev.addClass('pagination_disabled');
   }
   numberPageWinnnes.returnElement().innerHTML = `Page #${currentPageWinners}`;
}

let isSort: boolean = false;
export function sortWinners (): void {
   if (isSort === false) {
      isSort = true;
      getWinners(currentPageWinners, '10', 'wins', 'ASC')
      .then((winners: IGetWinners | undefined) => {
         winnerWinsArrow.removeClass('hidden');
         winnerTimeArrow.addClass('hidden');
         winnerWinsArrow.returnElement().style.backgroundImage = "url(./assets/Arrow.png)";
         winnersList.returnElement().innerHTML = '';
         const winnersData: IWinnerData[] = winners?.data ?? [];
         for(let i = 0; i < winnersData.length; i += 1) {
            counterWinners = arrList[currentPageWinners - 1][i];
            createListWinners(winnersData[i]);
         }
      })
   } else {
      isSort = false;
      getWinners(currentPageWinners, '10', 'wins', 'DESC')
      .then((winners: IGetWinners | undefined) => {
         winnersList.returnElement().innerHTML = '';
         winnerWinsArrow.removeClass('hidden');
         winnerTimeArrow.addClass('hidden');
         winnerWinsArrow.returnElement().style.backgroundImage = "url(./assets/arrow_down.png)";
         const winnersData: IWinnerData[] = winners?.data ?? [];
         for(let i = 0; i < winnersData.length; i += 1) {
            counterWinners = arrList[currentPageWinners - 1][i];
            createListWinners(winnersData[i]);
         }
      })
   }
}

let isSortTime: boolean = false;
export function sortWinnersTime (): void {
   if(isSortTime == false) {
      getWinners(currentPageWinners, '10', 'time', 'ASC')
      .then((winners: IGetWinners | undefined) => {
         isSortTime = true;
         winnerWinsArrow.addClass('hidden');
         winnerTimeArrow.removeClass('hidden');
         winnerTimeArrow.returnElement().style.backgroundImage = "url(./assets/Arrow.png)";
         winnersList.returnElement().innerHTML = '';
         const winnersData: IWinnerData[] = winners?.data ?? [];
         for(let i = 0; i < winnersData.length; i += 1) {
            counterWinners = arrList[currentPageWinners - 1][i];
            createListWinners(winnersData[i]);
         }
      })
   } else {
      isSortTime = false;
      getWinners(currentPageWinners, '10', 'time', 'DESC')
      .then((winners: IGetWinners | undefined) => {
         winnersList.returnElement().innerHTML = '';
         winnerWinsArrow.addClass('hidden');
         winnerTimeArrow.removeClass('hidden');
         winnerTimeArrow.returnElement().style.backgroundImage = "url(./assets/arrow_down.png)";
         const winnersData: IWinnerData[] = winners?.data ?? [];
         for(let i = 0; i < winnersData.length; i += 1) {
            counterWinners = arrList[currentPageWinners - 1][i];
            createListWinners(winnersData[i]);
         }
      })
   }
}