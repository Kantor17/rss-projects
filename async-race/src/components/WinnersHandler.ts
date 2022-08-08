import { WinnerParams } from '../utils/types';
import WinnersView from '../views/WinnersView';
import Communicator from './Communicator';

export default class GarageHandler {
  communicator = new Communicator();

  async makeWinner(id: number, time: number) {
    const allWinners = await (await this.communicator.getWinners()).winners;
    if (allWinners.some((item) => item.id === id)) {
      const car = await this.communicator.getWinner(id);
      let minTime = car.time;
      if (time < minTime) minTime = time;
      this.communicator.updateWinner({
        id,
        wins: car.wins + 1,
        time: minTime,
      });
    } else {
      this.createWinner({
        id,
        wins: 1,
        time,
      });
    }
  }

  async createWinner(params: WinnerParams) {
    this.communicator.createWinner(params);
  }

  async updateWinner(params: WinnerParams) {
    this.communicator.updateWinner(params);
  }

  async updateTable(
    page = WinnersView.getInstance().pageCount,
    limit = WinnersView.getInstance().LIMIT,
    sort?: 'wins' | 'time',
    order?: 'ASC' | 'DESC',
  ) {
    const view = WinnersView.getInstance();
    view.body.innerHTML = '';
    const { winners, count } = await this.communicator.getWinners(page, limit, sort, order);
    view.itemsCount = +(count as string);
    (view.viewE.querySelector('.total-counter') as HTMLElement).textContent = count;
    (await winners).forEach(async (winner) => {
      const { id, wins, time } = winner;
      const { color, name } = await this.communicator.getCar(id);
      const elem = view.createWinnerRow(color, name, wins, time);
      view.body.append(elem);
    });
    view.checkPaginationButtons(view);
  }

  updatePage(page: number) {
    const view = WinnersView.getInstance();
    this.updateTable(view.pageCount = page);
    view.updatePageCounter(view);
  }
}
