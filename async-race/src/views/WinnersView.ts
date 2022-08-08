import WinnersHandler from '../components/WinnersHandler';
import View from './View';

export default class WinnersView extends View {
  LIMIT = 10;

  viewE = this.createView();

  body = this.viewE.querySelector('tbody') as HTMLElement;

  handler = new WinnersHandler();

  itemsCount = 0;

  pageCount = 1;

  currentSort?: 'wins' | 'time';

  currentOrder?: 'ASC' | 'DESC';

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
      this.createPagination(this),
    );
    return view;
  }

  createTable() {
    const table = this.createElementFromMarkup(`
  <table class="winners-table">
    <thead>
      <tr>
        <th>Number</th>
        <th>Car</th>
        <th>Name</th>
        <th class="wins-sort sort-btn">Wins</th>
        <th class="time-sort sort-btn">Best time</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>`);
    const winsSort = table.querySelector('.wins-sort') as HTMLElement;
    const timeSort = table.querySelector('.time-sort') as HTMLElement;
    winsSort.addEventListener('click', () => {
      this.handler.sort('wins', winsSort, timeSort);
    });
    timeSort.addEventListener('click', () => {
      this.handler.sort('time', timeSort, winsSort);
    });
    return table;
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
