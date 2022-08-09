import { CarType } from '../utils/types';
import View from './View';
import GarageHandler from '../components/GarageHandler';
import Driving from '../components/Driving';

export default class GarageView extends View {
  static Instance: GarageView;

  LIMIT = 7;

  handler = new GarageHandler();

  driving = new Driving();

  carsWrapper = this.createCarsWrapper();

  viewE = this.createView();

  itemsCount = 0;

  pageCount = 1;

  static getInstance() {
    if (!GarageView.Instance) GarageView.Instance = new GarageView();
    return GarageView.Instance;
  }

  createView() {
    const view = this.createElement('div', 'garage-view');
    view.append(
      this.createTitle('Garage'),
      this.createCarsManager(),
      this.createPageCounter(),
      this.createControls(),
      this.carsWrapper,
      this.createPagination(this),
    );
    return view;
  }

  createCarsManager() {
    const carsManager = this.createElement('div', 'cars-manager');
    carsManager.append(this.createCarCreator(), this.createCarsUpdater());
    return carsManager;
  }

  createCarCreator() {
    const carCreator = this.createElement('div', 'car-creator');
    const carName = this.createElement('input', 'car-name') as HTMLInputElement;

    const carColor = this.createElement('input', 'car-color') as HTMLInputElement;
    carColor.type = 'color';

    const creationBtn = this.createElement('button', 'creation-btn', 'Create');
    creationBtn.addEventListener('click', () => this.handler.handleCarAdding(carName, carColor));

    carCreator.append(carName, carColor, creationBtn);
    return carCreator;
  }

  createCarsUpdater() {
    const carUpdater = this.createElement('div', 'cars-updater disabled');

    const carName = this.createElement('input', 'car-name') as HTMLInputElement;

    const carColor = this.createElement('input', 'car-color') as HTMLInputElement;
    carColor.type = 'color';

    const updateBtn = this.createElement('button', 'update-btn', 'Update');
    updateBtn.addEventListener('click', () => this.handler.handleCarUpdating(carName, carColor));

    carUpdater.append(carName, carColor, updateBtn);
    return carUpdater;
  }

  createControls() {
    const controls = this.createElement('div', 'controls');
    const raceBtn = this.createElement('button', 'race-btn btn-primary', 'Race');
    const resetBtn = this.createElement('button', 'reset-btn btn-primary btn-disabled', 'Reset');
    const generateBtn = this.createElement('button', 'generate-btn btn-long', 'Generate cars');
    generateBtn.addEventListener('click', () => this.handler.generateCars());
    raceBtn.addEventListener(
      'click',
      () => this.driving.startRace(
        Array.from(this.carsWrapper.childNodes) as HTMLElement[],
        raceBtn,
      ),
    );
    resetBtn.addEventListener(
      'click',
      () => this.driving.resetRace(
        Array.from(this.carsWrapper.querySelectorAll('.onDrive')),
        resetBtn,
      ),
    );
    controls.append(raceBtn, resetBtn, generateBtn);
    return controls;
  }

  createCarsWrapper() {
    return this.createElement('div', 'cars-wrapper');
  }

  replaceCars(cars: CarType[]) {
    const newCars = cars.map((car) => this.createCarE(car));
    this.carsWrapper.replaceChildren(...newCars);
  }

  createCarE(car: CarType) {
    const { name, color, id } = car;
    const carE = this.createElementFromMarkup(`
    <div class="car" data-id="${id}">
      <h3 class="car-name">${name}</h3>
      <div class="car-tools">
        <button class="car-select">Select</button>
        <button class="car-remove">Remove</button>
      </div>
      <div class="car-controls">
        <button class="car-start">Start</button>
        <button class="car-return btn-disabled">Return</button>
      </div>
      <div class="car-track">
        <div class="car-model">
          ${this.createImage(color)}
        </div>
        <div class="finish">
          <img src="./assets/finish-flag.svg" alt="finish">
        </div>
      </div>
    </div>`);
    carE.querySelector('.car-remove')?.addEventListener('click', () => this.handler.handleCarRemoving(carE as HTMLElement));
    carE.querySelector('.car-select')?.addEventListener('click', () => this.handler.handleCarSelection(carE as HTMLElement));
    carE.querySelector('.car-start')?.addEventListener('click', async () => {
      try {
        await this.driving.startEngine(carE as HTMLElement);
      } catch {
        console.log(`${carE.querySelector('.car-name')?.textContent} was unable to complete the ride`);
      }
    });
    return carE;
  }

  appendCar(car: Element) {
    this.carsWrapper.append(car);
  }

  checkForDrivingCars() {
    return ((Array.from(this.carsWrapper.childNodes) as HTMLElement[]).some((car) => car.classList.contains('onDrive')));
  }
}
