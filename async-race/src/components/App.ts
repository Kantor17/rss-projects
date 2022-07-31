import GarageView from '../views/GarageView';
import WinnersView from '../views/WinnersView';
import { CarType } from '../utils/types';
import Communicator from './Communicator';

export default class {
  container: HTMLElement;

  garageView: GarageView;

  winnersView: WinnersView;

  communicator: Communicator;

  constructor() {
    this.container = document.createElement('div');
    this.garageView = new GarageView();
    this.winnersView = new WinnersView();
    this.communicator = new Communicator();
  }

  async run() {
    this.renderStartPage();
    const cars = await this.communicator.getCars();
    this.renderCars(cars);
  }

  renderStartPage() {
    this.container.className = 'container';

    const nav = document.createElement('div');
    nav.innerHTML = `
    <div class="nav">
      <button class="garage-btn btn-primary">Garage</button>
      <button class="winners-btn btn-primary">Winners</button>
    </div>`;
    nav.querySelector('.garage-btn')?.addEventListener('click', () => this.goToGarage());
    nav.querySelector('.winners-btn')?.addEventListener('click', () => this.goToWinners());

    this.container.append(nav.children[0]);
    this.container.append(this.garageView.viewE, this.winnersView.viewE);
    document.body.append(this.container);
  }

  renderCars(cars: CarType[]) {
    cars.forEach((car) => {
      this.garageView.renderCar(car);
    });
  }

  goToGarage() {
    this.winnersView.viewE.style.display = 'none';
    this.garageView.viewE.style.display = 'block';
  }

  goToWinners() {
    this.garageView.viewE.style.display = 'none';
    this.winnersView.viewE.style.display = 'block';
  }
}
