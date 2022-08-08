import { WinnerParams } from '../utils/types';
import WinnersView from '../views/WinnersView';
import Communicator from './Communicator';

export default class {
  communicator = new Communicator();

  async makeWinner(id: number, time: number) {
    const allWinners = await this.communicator.getWinners();
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

  async updateTable() {
    const view = WinnersView.getInstance();
    view.body.innerHTML = '';
    const winners = await this.communicator.getWinners();
    winners.forEach(async (winner) => {
      const { id, wins, time } = winner;
      const { color, name } = await this.communicator.getCar(id);
      const elem = view.createWinnerRow(color, name, wins, time);
      view.body.append(elem);
    });
  }
}
