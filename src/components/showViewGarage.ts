import { viewGarage, viewWinners, winnersList } from "./pages/main/main";

export function showViewGarage(): void {
        viewGarage.removeClass('hidden');
        viewWinners.addClass('hidden');
        winnersList.returnElement().innerHTML = '';
}
