import { generateCarName, generateCarColor } from '../utils/paramsGenerator';
import { CarType } from '../utils/types';
import { instance as garageView } from '../views/GarageView';
import Communicator from './Communicator';

class GarageHandler {
  communicator = new Communicator();

  selectedCar: HTMLElement | null = null;

  DEFAULT_COLOR = '#000000';

  EMPTY_NAME_MESSAGE = 'Please enter some name for a car';

  CARS_PER_CLICK = 100;

  async stuffCarsWrapper() {
    const cars = await this.communicator.getCars(garageView.pageCount, garageView.LIMIT);
    cars.forEach((car: CarType) => {
      this.communicator.stopEngine(car.id);
      garageView.appendCar(garageView.createCarE(car));
    });
  }

  async initItemCounter() {
    const total = await this.communicator.getTotalItems() as string;
    this.updateItemsCounter(+total);
  }

  handleCarAdding(carNameE: HTMLInputElement, carColorE: HTMLInputElement) {
    const name = carNameE.value;
    if (name.trim()) {
      this.addCar(carNameE.value, carColorE.value);
      carNameE.value = '';
      carColorE.value = this.DEFAULT_COLOR;
    } else {
      alert(this.EMPTY_NAME_MESSAGE);
    }
  }

  async addCar(name: string, color: string) {
    const car = await this.communicator.addCar({ name, color });
    if (garageView.carsWrapper.childNodes.length < garageView.LIMIT) {
      garageView.appendCar(garageView.createCarE(car));
    }
    this.updateItemsCounter(garageView.itemsCount += 1);
  }

  generateCars() {
    for (let i = 0; i < this.CARS_PER_CLICK; i += 1) {
      this.addCar(generateCarName(), generateCarColor());
    }
  }

  async handleCarRemoving(carE: HTMLElement) {
    carE.remove();
    if (carE === this.selectedCar) this.removeFromSelected(carE);
    const id = carE.dataset.id as string;
    this.communicator.removeWinner(id);
    this.communicator.removeCar(id);
    this.updateItemsCounter(garageView.itemsCount -= 1);

    const newCars = await this.communicator.getCars(garageView.pageCount, garageView.LIMIT);
    const lastNewCar = newCars[garageView.LIMIT - 1];
    if (lastNewCar) {
      garageView.appendCar(garageView.createCarE(lastNewCar));
    }

    if (garageView.carsWrapper.childNodes.length < 1 && garageView.pageCount > 1) {
      this.updatePage(garageView.pageCount -= 1);
    }
  }

  handleCarSelection(carE: HTMLElement) {
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
    carColor.value = this.DEFAULT_COLOR;
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
    const carsUpdater = garageView.viewE.querySelector('.cars-updater');
    return {
      carsUpdater,
      carName: carsUpdater?.querySelector('.car-name') as HTMLInputElement,
      carColor: carsUpdater?.querySelector('.car-color') as HTMLInputElement,
    };
  }

  handleCarUpdating(
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
      alert(this.EMPTY_NAME_MESSAGE);
    }
  }

  async updatePage(page: number) {
    const cars = await this.communicator.getCars(page, garageView.LIMIT);
    garageView.replaceCars(cars);
    garageView.updatePageCounter(garageView);
    garageView.checkPaginationButtons(garageView);
    this.removeFromSelected();
  }

  updateItemsCounter(value = 0) {
    (garageView.viewE.querySelector('.total-counter') as HTMLElement).textContent = value.toString();
    garageView.itemsCount = value;
    garageView.checkPaginationButtons(garageView);
  }
}

export default new GarageHandler();
