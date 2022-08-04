import GarageView from '../views/GarageView';
import WinnersView from '../views/WinnersView';
import Communicator from './Communicator';
import GarageHandler from './GarageHandler';

export default class {
  container = document.createElement('div');

  garageView = GarageView.getInstance();

  garageHandler = new GarageHandler();

  winnersView = new WinnersView();

  communicator = new Communicator();

  async run() {
    this.renderStartPage();
    await this.garageHandler.stuffCarsWrapper();
    await this.garageHandler.updateItemsCounter();
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

  hide(elem: HTMLElement) {
    elem.classList.add('hidden');
  }

  show(elem: HTMLElement) {
    elem.classList.remove('hidden');
  }

  goToGarage() {
    this.hide(this.winnersView.viewE);
    this.show(this.garageView.viewE);
  }

  goToWinners() {
    this.hide(this.garageView.viewE);
    this.show(this.winnersView.viewE);
  }
}
