/* eslint-disable no-param-reassign */
import { CARS_PER_PAGE } from '../utils/constants';
import { CarType } from '../utils/types';
import GarageView from '../views/GarageView';
import Communicator from './Communicator';

export default class GarageHandler {
  communicator = new Communicator();

  selectedCar: HTMLElement | null = null;

  async stuffCarsWrapper() {
    const garage = GarageView.getInstance();
    const cars = await this.communicator.getCars(garage.pageCount, CARS_PER_PAGE);
    cars.forEach((car: CarType) => garage.appendCar(garage.createCarE(car)));
  }

  async handleCarAdding(carNameE: HTMLInputElement, carColorE: HTMLInputElement) {
    const name = carNameE.value;
    if (name.trim()) {
      const color = carColorE.value;
      const params = {
        name,
        color,
      };

      const car = await this.communicator.addCar(params);
      const garage = GarageView.getInstance();
      if (garage.carsWrapper.childNodes.length < CARS_PER_PAGE) {
        garage.appendCar(garage.createCarE(car));
      }

      carNameE.value = '';
      carColorE.value = '#000000';

      await this.updateItemsCounter();
    } else {
      alert('Please enter some name for a car');
    }
  }

  async handleCarRemoving(carE: HTMLElement) {
    const garage = GarageView.getInstance();
    this.removeFromSelected(carE);
    await this.communicator.removeCar(carE.dataset.id as string);
    await this.updateItemsCounter();
    const newCars = await this.communicator.getCars(garage.pageCount, CARS_PER_PAGE);
    const lastNewCar = newCars[CARS_PER_PAGE - 1];
    carE.remove();
    if (lastNewCar) {
      garage.appendCar(garage.createCarE(lastNewCar));
    }
  }

  async handleCarSelection(carE: HTMLElement) {
    if (this.selectedCar === carE) {
      this.removeFromSelected(carE);
    } else {
      this.removeFromSelected(this.selectedCar);
      this.addToSelected(carE);
    }
  }

  removeFromSelected(carE = this.selectedCar) {
    const { carsUpdater, carName, carColor } = this.getUpdatingControls();
    carsUpdater?.classList.add('disabled');
    if (this.selectedCar === carE) {
      this.selectedCar = null;
      carName.value = '';
      carColor.value = '#000000';
    }
    carE?.classList.remove('selected');
  }

  addToSelected(carE: HTMLElement) {
    const { carsUpdater, carName, carColor } = this.getUpdatingControls();
    carsUpdater?.classList.remove('disabled');

    carName.value = carE.querySelector('.car-name')?.textContent as string;
    carColor.value = carE.querySelector('.car-model svg')?.getAttribute('fill') as string;
    this.selectedCar = carE;
    carE.classList.add('selected');
  }

  getUpdatingControls() {
    const carsUpdater = GarageView.getInstance().viewE.querySelector('.cars-updater');
    return {
      carsUpdater,
      carName: carsUpdater?.querySelector('.car-name') as HTMLInputElement,
      carColor: carsUpdater?.querySelector('.car-color') as HTMLInputElement,
    };
  }

  async handleCarUpdating(
    carNameE: HTMLInputElement,
    carColorE: HTMLInputElement,
  ) {
    const name = carNameE.value;
    if (name.trim()) {
      const color = carColorE.value;
      this.communicator.updateCar(this.selectedCar?.dataset.id as string, { name, color });

      (this.selectedCar?.querySelector('.car-name') as HTMLElement).textContent = name;
      this.selectedCar?.querySelector('.car-model svg')?.setAttribute('fill', color);
      this.removeFromSelected(this.selectedCar);
    } else {
      alert('Please enter some name for a car');
    }
  }

  async updatePage(cars: CarType[]) {
    GarageView.getInstance().replaceCars(cars);
    this.updatePageCounter();
    this.checkPaginationButtons();
    this.removeFromSelected();
  }

  updatePageCounter() {
    const { viewE, pageCount } = GarageView.getInstance();
    (viewE.querySelector('.page-num') as HTMLElement)
      .textContent = pageCount.toString();
  }

  checkPaginationButtons() {
    const { viewE, pageCount, itemsCount } = GarageView.getInstance();

    const prevBtn = viewE.querySelector('.prev-btn') as HTMLElement;
    if (pageCount < 2) {
      prevBtn.classList.add('btn-disabled');
    } else {
      prevBtn.classList.remove('btn-disabled');
    }

    const nextBtn = viewE.querySelector('.next-btn') as HTMLElement;
    if (itemsCount <= pageCount * CARS_PER_PAGE) {
      nextBtn.classList.add('btn-disabled');
    } else {
      nextBtn.classList.remove('btn-disabled');
    }
  }

  async updateItemsCounter() {
    const { viewE } = GarageView.getInstance();
    const totalItems = await this.communicator.getTotalItems() as string;
    (viewE.querySelector('.total-counter') as HTMLElement).textContent = totalItems;
    GarageView.getInstance().itemsCount = +totalItems;
    this.checkPaginationButtons();
  }
}
