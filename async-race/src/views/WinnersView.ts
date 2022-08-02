import Template from './Template';

export default class WinnersView extends Template {
  viewE = this.createView();

  createView() {
    const view = document.createElement('div');
    view.className = 'winners-view';
    view.append(
      this.createTitle('Winners'),
      this.createPageCounter(),
      this.createTable(),
      this.createPagination(),
    );
    return view;
  }

  createTable() {
    const table = document.createElement('div');
    table.innerHTML = `
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
      <tr>
        <td></td>
        <td><img src="../assets/car.svg" alt="car"></td>
        <td>Tesla</td>
        <td>1</td>
        <td>10s</td>
      </tr>
      <tr>
        <td></td>
        <td><img src="../assets/car.svg" alt="car"></td>
        <td>Tesla</td>
        <td>1</td>
        <td>10s</td>
      </tr>
      <tr>
        <td></td>
        <td><img src="../assets/car.svg" alt="car"></td>
        <td>Tesla</td>
        <td>1</td>
        <td>10s</td>
      </tr>
    </tbody>
  </table>`;
    return table.children[0];
  }
}
