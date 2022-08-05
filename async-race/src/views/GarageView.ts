import Paginator from '../components/Paginator';
import { CarType } from '../utils/types';
import View from './View';
import GarageHandler from '../components/GarageHandler';
import Driving from '../components/Driving';

export default class GarageView extends View {
  static Instance: GarageView;

  paginator = new Paginator();

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
      this.createPagination(),
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
    creationBtn.addEventListener('click', async () => this.handler.handleCarAdding(carName, carColor));

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
    const resetBtn = this.createElement('button', 'reset-btn btn-primary', 'Reset');
    const generateBtn = this.createElement('button', 'generate-btn btn-long', 'Generate cars');
    generateBtn.addEventListener('click', () => this.handler.generateCars());
    controls.append(raceBtn, resetBtn, generateBtn);
    return controls;
  }

  createPagination() {
    const pagination = super.createPagination();
    (pagination.querySelector('.prev-btn') as HTMLElement).addEventListener('click', () => {
      this.paginator.prevPage();
    });
    (pagination.querySelector('.next-btn') as HTMLElement).addEventListener('click', () => {
      this.paginator.nextPage();
    });
    return pagination;
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
          <img src="../assets/finish-flag.svg" alt="finish">
        </div>
      </div>
    </div>`);
    carE.querySelector('.car-remove')?.addEventListener('click', () => this.handler.handleCarRemoving(carE as HTMLElement));
    carE.querySelector('.car-select')?.addEventListener('click', () => this.handler.handleCarSelection(carE as HTMLElement));
    carE.querySelector('.car-start')?.addEventListener('click', () => this.driving.startEngine(carE as HTMLElement));
    return carE;
  }

  appendCar(car: Element) {
    this.carsWrapper.append(car);
  }

  createImage(color: string) {
    return `
    <svg fill="${color}" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 470 470" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 470 470">
    <g>
      <path d="m126.184,358.951c19.299,0 35-15.701 35-35s-15.701-35-35-35-35,15.701-35,35 15.701,35 35,35zm0-55c11.028,0 20,8.972 20,20s-8.972,20-20,20-20-8.972-20-20 8.971-20 20-20z"/>
      <path d="m343.816,288.951c-19.299,0-35,15.701-35,35s15.701,35 35,35 35-15.701 35-35-15.701-35-35-35zm0,55c-11.028,0-20-8.972-20-20s8.972-20 20-20 20,8.972 20,20-8.971,20-20,20z"/>
      <path d="m137.5,116.049h23.779c4.143,0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-23.779c-10.423,0-27.031,7.176-34.177,14.767l-60.088,63.845c-2.051,2.179-2.609,5.368-1.423,8.115 1.187,2.747 3.893,4.525 6.885,4.525h290.271c2.562,0 4.945-1.307 6.323-3.467 1.377-2.159 1.558-4.873 0.478-7.195l-30.854-66.365c-3.315-7.046-14.628-14.225-22.415-14.225h-101.221c-4.143,0-7.5,3.358-7.5,7.5l-.001,68.752h-117.722l48.19-51.204c4.243-4.508 17.066-10.048 23.254-10.048zm61.279,0h93.7c2.203,0.103 7.842,3.681 8.849,5.581l25.883,55.671h-128.433l.001-61.252z"/>
      <path d="m470,257.692c0-26.631-20.555-55.149-45.819-63.57-0.017-0.006-35.078-11.693-35.078-11.693-5.854-1.951-13.576-8.812-16.203-14.394l-30.84-65.535c-8.299-17.636-30.068-31.451-49.56-31.451h-155c-18.639,0-43.247,10.632-56.022,24.206l-69.158,73.482c-6.909,7.34-12.32,20.984-12.32,31.064v94.15c0,20.678 16.822,37.5 37.5,37.5h14.06c3.775,37.846 35.8,67.5 74.624,67.5s70.849-29.654 74.624-67.5h45.509c4.143,0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-45.509c-3.775-37.846-35.8-67.5-74.624-67.5s-70.849,29.654-74.624,67.5h-14.06c-12.406,0-22.5-10.093-22.5-22.5v-94.15c0-6.294 3.929-16.2 8.242-20.783l69.159-73.483c9.941-10.563 30.594-19.486 45.099-19.486h155c13.682,0 30.162,10.458 35.987,22.838l30.84,65.535c4.421,9.395 15.182,18.955 25.031,22.238l28.498,9.499c-0.492,2.841-0.748,5.729-0.748,8.642 0,25.238 18.65,46.198 42.892,49.831v29.32c0,12.407-8.357,22.5-18.631,22.5h-17.929c-3.775-37.846-35.8-67.5-74.624-67.5-41.355,0-75,33.645-75,75s33.645,75 75,75c38.824,0 70.849-29.654 74.624-67.5h17.929c18.544,0 33.631-16.822 33.631-37.5v-36.26zm-343.816,6.259c33.084,0 60,26.916 60,60s-26.916,60-60,60-60-26.916-60-60 26.916-60 60-60zm217.632,120c-33.084,0-60-26.916-60-60s26.916-60 60-60 60,26.916 60,60-26.916,60-60,60zm83.292-169.15c0-0.969 0.04-1.934 0.117-2.893 13.16,7.627 23.787,22.37 26.864,37.266-15.466-3.785-26.981-17.756-26.981-34.373z"/>
    </g>
  </svg>
    `;
  }
}
