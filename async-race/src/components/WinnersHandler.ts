import { Winner, WinnerParams } from '../utils/types';
import Communicator from './Communicator';

export default class {
  communicator = new Communicator();

  async makeWinner(winner: Winner) {
    const {
      id, image, name, time,
    } = winner;
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

  async updateWinners(params: WinnerParams) {
    this.communicator.updateWinner(params);
  }
}
