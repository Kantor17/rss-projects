import GarageView from '../views/GarageView';
import WinnersView from '../views/WinnersView';

export default class {
  garageView: HTMLElement;

  winnersView: HTMLElement;

  constructor() {
    this.garageView = new GarageView().createView();
    this.winnersView = new WinnersView().createView();
  }

  run() {
    this.renderNavigation();
    this.winnersView.style.display = 'none';
    document.body.append(this.garageView, this.winnersView);
  }

  renderNavigation() {
    const nav = document.createElement('nav');
    nav.className = 'nav';

    const garageButton = document.createElement('button');
    garageButton.className = 'garage-button';
    garageButton.textContent = 'Garage';
    garageButton.addEventListener('click', () => this.goToGarage());

    const winnersButton = document.createElement('button');
    winnersButton.textContent = 'Winners';
    winnersButton.className = 'winners-button';
    winnersButton.addEventListener('click', () => this.goToWinners());
    nav.append(garageButton, winnersButton);

    document.body.append(nav);
  }

  goToGarage() {
    this.winnersView.style.display = 'none';
    this.garageView.style.display = 'block';
    console.log(this.winnersView);
  }

  goToWinners() {
    this.garageView.style.display = 'none';
    this.winnersView.style.display = 'block';
  }
}
