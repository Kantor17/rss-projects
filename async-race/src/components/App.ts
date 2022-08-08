import GarageView from '../views/GarageView';
import WinnersView from '../views/WinnersView';
import GarageHandler from './GarageHandler';
import WinnersHandler from './WinnersHandler';

export default class {
  container = document.createElement('div');

  garageView = GarageView.getInstance();

  garageHandler = new GarageHandler();

  winnersView = WinnersView.getInstance();

  winnerHandler = new WinnersHandler();

  async run() {
    this.renderStartPage();
    await this.garageHandler.stuffCarsWrapper();
    await this.garageHandler.initItemCounter();
    await this.winnerHandler.updateTable();
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

  async goToWinners() {
    await this.winnerHandler.updateTable();
    this.hide(this.garageView.viewE);
    this.show(this.winnersView.viewE);
  }
}
