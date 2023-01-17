import { SortType, OrderType, WinnerParams } from '../utils/types';
import { instance as winnersView } from '../views/WinnersView';
import Communicator from './Communicator';

class WinnersHandler {
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

  createWinner(params: WinnerParams) {
    this.communicator.createWinner(params);
  }

  updateWinner(params: WinnerParams) {
    this.communicator.updateWinner(params);
  }

  async updateTable(
    page = winnersView.pageCount,
    limit = winnersView.LIMIT,
    sort = winnersView.currentSort,
    order = winnersView.currentOrder,
  ) {
    winnersView.body.innerHTML = '';
    const { winners, count } = await this.communicator.getWinners(page, limit, sort, order);
    winnersView.itemsCount = +(count as string);
    (winnersView.viewE.querySelector('.total-counter') as HTMLElement).textContent = count;
    (await winners).forEach(async (winner) => {
      const { id, wins, time } = winner;
      const { color, name } = await this.communicator.getCar(id);
      const elem = winnersView.createWinnerRow(color, name, wins, time);
      winnersView.body.append(elem);
    });
    winnersView.checkPaginationButtons(winnersView);
  }

  updatePage(page: number) {
    this.updateTable(winnersView.pageCount = page);
    winnersView.updatePageCounter(winnersView);
  }

  sort(type: SortType, btn: HTMLElement, otherBtn: HTMLElement) {
    let order: OrderType;
    otherBtn.className = 'sort-btn';
    if (btn.classList.contains('sorted-asc')) {
      btn.classList.remove('sorted-asc');
      btn.classList.add('sorted-desc');
      order = 'DESC';
    } else {
      btn.classList.remove('sorted-desc');
      btn.classList.add('sorted-asc');
      order = 'ASC';
    }
    winnersView.currentSort = type;
    winnersView.currentOrder = order;
    this.updateTable(undefined, undefined, type, order);
  }
}

export default new WinnersHandler();
