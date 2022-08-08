import WinnersHandler from '../components/WinnersHandler';
import View from './View';

export default class WinnersView extends View {
  viewE = this.createView();

  body = this.viewE.querySelector('tbody') as HTMLElement;

  handler = new WinnersHandler();

  static Instance: WinnersView;

  static getInstance() {
    if (!WinnersView.Instance) WinnersView.Instance = new WinnersView();
    return WinnersView.Instance;
  }

  createView() {
    const view = this.createElement('div', 'winners-view hidden');
    view.append(
      this.createTitle('Winners'),
      this.createPageCounter(),
      this.createTable(),
      this.createPagination(),
    );
    return view;
  }

  createTable() {
    return this.createElementFromMarkup(`
  <table class="winners-table">
    <thead>
      <tr>
        <th>Number</th>
        <th>Car</th>
        <th>Name</th>
        <th>Wins</th>
        <Th>Best time</Th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>`);
  }

  createWinnerRow(color: string, name: string, wins: number, time: number) {
    const rowE = document.createElement('tbody');
    rowE.innerHTML = `
    <tr>
      <td></td>
      <td>${this.createImage(color)}</td>
      <td>${name}</td>
      <td>${wins}</td>
      <td>${time}s</td>
    </tr>`;
    return rowE.children[0];
  }
}
