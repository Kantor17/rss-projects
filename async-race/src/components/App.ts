import { instance as garageView } from '../views/GarageView';
import { instance as winnersView } from '../views/WinnersView';
import garageHandler from './GarageHandler';
import winnersHandler from './WinnersHandler';

export default class {
  container = document.createElement('div');

  async run() {
    this.renderStartPage();
    await garageHandler.stuffCarsWrapper();
    await garageHandler.initItemCounter();
    await winnersHandler.updateTable();
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
    this.container.append(garageView.viewE, winnersView.viewE);
    document.body.append(this.container);
  }

  hide(elem: HTMLElement) {
    elem.classList.add('hidden');
  }

  show(elem: HTMLElement) {
    elem.classList.remove('hidden');
  }

  goToGarage() {
    this.hide(winnersView.viewE);
    this.show(garageView.viewE);
  }

  async goToWinners() {
    await winnersHandler.updateTable();
    this.hide(garageView.viewE);
    this.show(winnersView.viewE);
  }
}
