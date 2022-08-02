import GarageView from '../views/GarageView';
import WinnersView from '../views/WinnersView';
import Communicator from './Communicator';

export default class {
  container = document.createElement('div');

  garageView = new GarageView();

  winnersView = new WinnersView();

  communicator = new Communicator();

  async run() {
    this.renderStartPage();
    await this.garageView.stuffCarsWrapper();
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

  goToGarage() {
    this.winnersView.viewE.style.display = 'none';
    this.garageView.viewE.style.display = 'block';
  }

  goToWinners() {
    this.garageView.viewE.style.display = 'none';
    this.winnersView.viewE.style.display = 'block';
  }
}
