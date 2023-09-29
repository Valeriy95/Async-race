import { createCar } from "../../createCar";
import { AnimationIds, CarResponse, ICar, IData, IDataStartEngine, IElement, IElementInput, INewCar, IWinnerData } from "../../../types/types";
import { viewGarage } from "../main/main";
import { getAmountCars } from "../../getAmountCars";
import { allPages, allСars, getListCars } from "../../getListCars";
import { createListCars } from "../../createListCars";
import { getCar } from "../../getCar";
import { updateCar } from "../../updateCar";
import { deleteCar } from "../../deleteCar";
import { switchEngineToDrive } from "../../switchEngineToDrive";
import { startStopEngine } from "../../startStopEngine";
import { generateCars } from "./generateCars";
import { createWinner } from "../../createWinner";
import { getWinner } from "../../getWinner";
import { updateWinner } from "../../updateWinner";
import { NewElement, NewElementInput } from "../../class";
import './style.css'


export const containerCreateCar: IElement = new NewElement('div', 'create_car');
export const createCarName: IElementInput = new NewElementInput('input', 'create_car__name', 'text');
export const createCarColor: IElementInput = new NewElementInput('input', 'create_car__color', 'color');
export const btnCreateCar: IElement = new NewElement('div', 'create_car__btm');

export const containerUpdateCar: IElement = new NewElement('div', 'update_car');
export const updateCarName: IElementInput = new NewElementInput('input', 'update_car__name', 'text');
export const updateCarColor: IElementInput = new NewElementInput('input', 'update_car__color', 'color');
export const btnUpdateCar: IElement = new NewElement('div', 'update_car__btm');

export const containerGameBtn: IElement = new NewElement('div', 'game_btn');
export const btnRace: IElement = new NewElement('div', 'game_btn__race');
export const btnReset: IElement = new NewElement('div', 'game_btn__reset opacity');
export const btnGenerate: IElement = new NewElement('div', 'game_btn__generate');

export const amountCars: IElement = new NewElement('h3', 'amount_cars');
export const pageNumber: IElement = new NewElement('h3', 'page_number');
export const displayContainer: IElement = new NewElement('div', 'display_container');

export const displayWin: IElement = new NewElement('div', 'display_win');

export const pagination: IElement = new NewElement('div', 'pagination');
export const btnPrev: IElement = new NewElement('div', 'pagination_btn__prev');
export const btnNext: IElement = new NewElement('div', 'pagination_btn__next');

let currentUpdateName: string;
let currentUpdateColor: string;
let currentUpdateId: number;   
export let currentPage: number = 1;
let isStartEngine: boolean = false;
let isUpdate: boolean = false;

const newCar: INewCar = {
  name: '',
  color: '',
};


export function createViewGarage (): void {
    containerCreateCar.appendTo(viewGarage.returnElement());
    createCarName.appendTo(containerCreateCar.returnElement());
    createCarColor.appendTo(containerCreateCar.returnElement());
    btnCreateCar.appendTo(containerCreateCar.returnElement());
    btnCreateCar.returnElement().innerHTML = 'CREATE';

    containerUpdateCar.appendTo(viewGarage.returnElement());
    updateCarName.appendTo(containerUpdateCar.returnElement());
    updateCarName.disabled('disabled');
    updateCarColor.appendTo(containerUpdateCar.returnElement());
    btnUpdateCar.appendTo(containerUpdateCar.returnElement());
    btnUpdateCar.returnElement().innerHTML = 'UPDATE';

    containerGameBtn.appendTo(viewGarage.returnElement());
    btnRace.appendTo(containerGameBtn.returnElement());
    btnRace.returnElement().innerHTML = 'RACE';
    btnReset.appendTo(containerGameBtn.returnElement());
    btnReset.returnElement().innerHTML = 'RESET';
    btnGenerate.appendTo(containerGameBtn.returnElement());
    btnGenerate.returnElement().innerHTML = 'GENERATE CARS';

    amountCars.appendTo(viewGarage.returnElement());
    setAmountCars();
    pageNumber.appendTo(viewGarage.returnElement());
    pageNumber.returnElement().innerHTML = 'Page #1';
    displayContainer.appendTo(viewGarage.returnElement());

    pagination.appendTo(viewGarage.returnElement());
    btnPrev.appendTo(pagination.returnElement());
    btnPrev.returnElement().innerHTML = 'PREV';
    btnPrev.addClass('pagination_disabled');
    btnNext.appendTo(pagination.returnElement());
    btnNext.returnElement().innerHTML = 'NEXT';
    btnNext.addClass('pagination_disabled');
}

createCarColor.returnElement().addEventListener('change', setColor);
createCarName.returnElement().addEventListener('change', setName);
btnCreateCar.returnElement().addEventListener('click', sendNewCar);

function setName(): void {
  newCar.name = createCarName.getValue();
}
    
function setColor(): void {
  newCar.color = createCarColor.getValue()
}

function sendNewCar(): void {
  if (newCar.name !== '') {
    createCarName.deleteValue();
    createCarColor.setValue('#000000');
    createCar(newCar)
    .then((createdCar: ICar): void => {
    console.log('Car created:', createdCar);
    drawListCars(currentPage);
    newCar.name = '';
    })
    .catch((error: Error) => {
      console.error('Error:', error);
    });
  } 
}

export function setAmountCars(): void {
  getAmountCars()
  .then((Cars: number): void => {
    amountCars.returnElement().innerHTML = `Garage (${Cars})`
  })
  .catch((error: Error) => {
    console.error('Error:', error);
  });
}

export function drawListCars(num: number): void {
  getListCars(num)
  .then((arrCar: ICar[] | undefined) => {
    displayContainer.deleteChild();
    displayWin.appendTo(displayContainer.returnElement());
    arrCar?.forEach(v => createListCars(v));
    if(allСars > 7 && allPages !== currentPage) {
      btnNext.removeClass('pagination_disabled');
    }
    if(allСars <= 7) {
      btnNext.addClass('pagination_disabled');
    }
    if (currentPage === allPages) {
      btnNext.addClass('pagination_disabled');
    }
  })
  .catch((error: Error) => {
    console.error('Error:', error);
  });
}

drawListCars(currentPage);


updateCarName.returnElement().addEventListener('change', setUpdateName);
updateCarColor.returnElement().addEventListener('change', setUpdateColor);

function setUpdateName(): void {
  updateCarName.setValue(updateCarName.getValue());
  console.log(updateCarName.getValue());
}

function setUpdateColor(): void {
  updateCarColor.setValue(updateCarColor.getValue());
}


displayContainer.returnElement().addEventListener('click', function(e) {
  const target = e.target as HTMLElement;
  if (target.classList.value === 'display_head__btn_select') {
    isUpdate = true;
    getCar(<string>target.dataset.id)
    .then((car: CarResponse): void => {
      updateCarName.returnElement().removeAttribute('disabled');
      updateCarName.setValue(`${car?.name}`);
      updateCarColor.setValue(`${car?.color}`);
      currentUpdateId = <number>car?.id; 
    })
    .catch((error: Error) => {
      console.error('Error:', error);
    });
  }
  if (target.classList.value === 'display_head__btn_remove') {
    deleteCar(<string>target.dataset.id)
    .then((): void => {
      drawListCars(currentPage);
    })
  }
  if (target.classList.value === 'display_main__btn_race') {
    if (isStartEngine === false) {
      const btnStart = document.querySelector(`[data-start="${target.dataset.start}"]`);
      const btnStop = document.querySelector(`[data-stop="${target.dataset.start}"]`);
      btnStart?.classList.add('no_active');
      btnStop?.classList.remove('no_active');
      const container = <HTMLElement>document.querySelector('.display_main');
      const width = container.offsetWidth;
      const endX = width - 150;
      startStopEngine(<string>target.dataset.start, 'started')
      .then((result: IData): void => {
        const time = result.distance / result.velocity;
        switchEngineToDrive(<string>target.dataset.start);
        isStartEngine = true;

        function animation(): void {
          const carImage: HTMLElement = <HTMLElement>document.querySelector(`[data-id="car${target.dataset.start}"]`);
          let startX: number = carImage.offsetLeft - 50;   
          const count: number = time / 1000 * 60;
          const intermediate: number = (endX - startX) / count;    
          const step = () => {   
            startX += intermediate;
            carImage.style.transform = `translateX(${startX}px)`;
            if(startX < endX) {
              animationIds[`${target.dataset.start}`] = requestAnimationFrame(step)
            }
          };
          step();
        }
        animationIds[`${target.dataset.start}`] = requestAnimationFrame(animation)
      })
      .catch(error => console.error(error));
    }
  }
  if (target.classList[0] === 'display_main__btn_stop') {
    if (isStartEngine === true) {
      startStopEngine(<string>target.dataset.stop, 'stopped')
      .then((): void => {
        cancelAnimationFrame(animationIds[`${target.dataset.stop}`]);
          const btnStart: HTMLElement = <HTMLElement>document.querySelector(`[data-start="${target.dataset.stop}"]`);
          const btnStop: HTMLElement = <HTMLElement>document.querySelector(`[data-stop="${target.dataset.stop}"]`);
          const imageCar: HTMLElement = <HTMLElement>document.querySelector(`[data-id="car${target.dataset.stop}"]`);
          btnStart.classList.remove('no_active');
          btnStop.classList.add('no_active');
          imageCar.style.transform = 'translateX(0px)';
          isStartEngine = false;
      })
      .catch(error => {
        console.error(error)
      });
    }
  }
})

btnUpdateCar.returnElement().addEventListener('click', function(): void {
  if (isUpdate === true) {
    isUpdate = false;
    currentUpdateName = updateCarName.getValue();
    currentUpdateColor = updateCarColor.getValue();
    updateCarName.disabled('true');
    updateCarName.deleteValue();
    updateCarColor.setValue('#000000');
    updateCar(currentUpdateId, currentUpdateName, currentUpdateColor)
    .then(() => {
      drawListCars(currentPage);
    })
  }
})

btnNext.returnElement().addEventListener('click', function(): void {
  if (currentPage < allPages) {
    currentPage++;
    btnNext.removeClass('pagination_disabled');
    btnPrev.removeClass('pagination_disabled');
    drawListCars(currentPage);
  } 
  pageNumber.returnElement().innerHTML = `Page #${currentPage}`;
})

btnPrev.returnElement().addEventListener('click', function(): void {
  if (currentPage > 1) {
    currentPage--;
    drawListCars(currentPage);
    btnPrev.removeClass('pagination_disabled');
    btnNext.removeClass('pagination_disabled');
  } 
  if (currentPage === 1) {
    btnPrev.addClass('pagination_disabled');
  }
  pageNumber.returnElement().innerHTML = `Page #${currentPage}`;
})


let resultCar: string[] = [];
let isRace: boolean = false;



export let animationIds: AnimationIds = {};
let counterCarFinish: number = 0
btnRace.returnElement().addEventListener('click', function(): void {
  animationIds = {}
  resultCar = [];
  const arrPromise: Promise<IData>[] = [];
  if (isRace === false) {
  btnRace.addClass('opacity');
  isRace = true;
  const parentElement: HTMLElement = <HTMLElement>document.querySelector('.display_container');
  const children: HTMLCollection = parentElement.children;
  const arrClidrenId: string[] = [];
  const arrTimes: string[] = [];

  for (let i = 1; i < children.length; i += 1) {
    arrPromise.push(startStopEngine(children[i].id, 'started'));
    arrClidrenId.push(children[i].id);
  }
  
  const container: HTMLElement = <HTMLElement>document.querySelector('.display_main');
  const width: number = container.offsetWidth;
  const endX: number = width - 150;
  Promise.all(arrPromise)
  .then((result: IData[]): void => {
    for (let i = 0; i < arrPromise.length; i += 1) {
      const time: number = result[i].distance / result[i].velocity;
      const timeWin: string = ((time / 1000).toFixed(2));
      arrTimes.push(timeWin);

      /* eslint-disable no-inner-declarations */
      function animation(): void {
        const carImage: HTMLElement = <HTMLElement>document.querySelector(`[data-id="car${arrClidrenId[i]}"]`);
        let startX: number = carImage.offsetLeft - 50;
        const count: number = time / 1000 * 60;
        const intermediate: number = (endX - startX) / count;
        const step = (): void => {
          startX += intermediate;
          carImage.style.transform = `translateX(${startX}px)`;
          if(startX < endX) {
            animationIds[arrClidrenId[i]] = requestAnimationFrame(step)
          }
        };
        step();
      }
      animationIds[arrClidrenId[i]] = requestAnimationFrame(animation)

      switchEngineToDrive(arrClidrenId[i])
      .then((results: IDataStartEngine) => {
      counterCarFinish += 1;
      if(results.success === true) {
        if (resultCar.length === 0) {
          const carImage: HTMLElement = <HTMLElement>document.querySelector(`[data-id="name${arrClidrenId[i]}"]`);
          resultCar.push(arrClidrenId[i])
          displayWin.returnElement().innerText = `${carImage.innerText} went first ${arrTimes[i]}s`;
          displayWin.removeClass('hidden');
          getWinner(arrClidrenId[i])
          .then((data: IWinnerData | undefined) => {
            if(data?.id) {
              const sumWins: number = data.wins + 1;
              console.log(arrTimes[i])
              if (data.time > (+arrTimes[i])) {
                updateWinner(data.id, sumWins, (+arrTimes[i]))
              } else {
                updateWinner(data.id, sumWins, data.time)
              }
            } else {
              const newWinnerCar: IWinnerData = {
                id: +arrClidrenId[i],
                wins: 1,
                time: +arrTimes[i]
              }      
              createWinner(newWinnerCar);
            }
          })
          .catch((error) => {
            console.log(`Error: ${error}`);
          })
        }
        if (counterCarFinish === arrPromise.length) {
          btnReset.removeClass('opacity');
        }
      }
      })
      .catch((error) => {
        counterCarFinish += 1;
        if (counterCarFinish === arrPromise.length) {
          btnReset.removeClass('opacity');
        }
        console.log(`Error: ${error}`)
      })
    }
  })
}
});


btnReset.returnElement().addEventListener('click', function(): void {
  const parentElement: HTMLElement = <HTMLElement>document.querySelector('.display_container');
  const children: HTMLCollection = parentElement.children;
  if(counterCarFinish === (children.length - 1)) {
    for(let i = 1; i < children.length; i += 1) {
      startStopEngine(children[i].id, 'stopped')
      .then((): void => {
        cancelAnimationFrame(animationIds[children[i].id]);
          const imageCar = <HTMLElement>document.querySelector(`[data-id="car${children[i].id}"]`);
          imageCar.style.transform = 'translateX(0px)';
          displayWin.returnElement().innerText = '';
          displayWin.addClass('hidden');
      })
    }
    btnRace.removeClass('opacity');
    isRace = false;
    btnReset.addClass('opacity');
    counterCarFinish = 0
  }
});

btnGenerate.returnElement().addEventListener('click', generateCars);

