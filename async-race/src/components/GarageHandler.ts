import { generateCarName, generateCarColor } from '../utils/paramsGenerator';
import { CarType } from '../utils/types';
import GarageView from '../views/GarageView';
import Communicator from './Communicator';

export default class GarageHandler {
  communicator = new Communicator();

  selectedCar: HTMLElement | null = null;

  async stuffCarsWrapper() {
    const garage = GarageView.getInstance();
    const cars = await this.communicator.getCars(garage.pageCount, garage.LIMIT);
    cars.forEach((car: CarType) => {
      this.communicator.stopEngine(car.id);
      garage.appendCar(garage.createCarE(car));
    });
  }

  async initItemCounter() {
    const total = await this.communicator.getTotalItems() as string;
    this.updateItemsCounter(+total);
  }

  async handleCarAdding(carNameE: HTMLInputElement, carColorE: HTMLInputElement) {
    const name = carNameE.value;
    if (name.trim()) {
      await this.addCar(carNameE.value, carColorE.value);
      carNameE.value = '';
      carColorE.value = '#000000';
    } else {
      alert('Please enter some name for a car');
    }
  }

  async addCar(name: string, color: string) {
    const params = {
      name,
      color,
    };
    const car = await this.communicator.addCar(params);
    const garage = GarageView.getInstance();
    if (garage.carsWrapper.childNodes.length < garage.LIMIT) {
      garage.appendCar(garage.createCarE(car));
    }
    this.updateItemsCounter(garage.itemsCount += 1);
  }

  generateCars() {
    for (let i = 0; i < 100; i += 1) {
      this.addCar(generateCarName(), generateCarColor());
    }
  }

  async handleCarRemoving(carE: HTMLElement) {
    carE.remove();
    const garage = GarageView.getInstance();
    if (carE === this.selectedCar) this.removeFromSelected(carE);
    await this.communicator.removeCar(carE.dataset.id as string);
    this.updateItemsCounter(garage.itemsCount -= 1);

    const newCars = await this.communicator.getCars(garage.pageCount, garage.LIMIT);
    const lastNewCar = newCars[garage.LIMIT - 1];
    if (lastNewCar) {
      garage.appendCar(garage.createCarE(lastNewCar));
    }

    if (garage.carsWrapper.childNodes.length < 1 && garage.pageCount > 1) {
      this.updatePage(garage.pageCount -= 1);
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
    this.selectedCar = null;
    carName.value = '';
    carColor.value = '#000000';
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

  async updatePage(page: number) {
    const garage = GarageView.getInstance();
    const cars = await this.communicator.getCars(page, garage.LIMIT);
    GarageView.getInstance().replaceCars(cars);
    this.updatePageCounter();
    garage.checkPaginationButtons(garage);
    this.removeFromSelected();
  }

  updatePageCounter() {
    const { viewE, pageCount } = GarageView.getInstance();
    (viewE.querySelector('.page-num') as HTMLElement)
      .textContent = pageCount.toString();
  }

  updateItemsCounter(value = 0) {
    const { viewE } = GarageView.getInstance();
    (viewE.querySelector('.total-counter') as HTMLElement).textContent = value.toString();
    const garage = GarageView.getInstance();
    garage.itemsCount = value;
    garage.checkPaginationButtons(garage);
  }
}
