import GarageView from '../views/GarageView';
import WinnersView from '../views/WinnersView';

export default class {
  container: HTMLElement;

  garageView: HTMLElement;

  winnersView: HTMLElement;

  constructor() {
    this.container = document.createElement('div');
    this.garageView = new GarageView().createView();
    this.winnersView = new WinnersView().createView();
  }

  run() {
    this.renderStartPage();
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
    this.container.append(this.garageView, this.winnersView);
    document.body.append(this.container);
  }

  goToGarage() {
    this.winnersView.style.display = 'none';
    this.garageView.style.display = 'block';
  }

  goToWinners() {
    this.garageView.style.display = 'none';
    this.winnersView.style.display = 'block';
  }
}
