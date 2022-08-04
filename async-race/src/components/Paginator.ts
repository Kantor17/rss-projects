import Communicator from './Communicator';
import { CARS_PER_PAGE } from '../utils/constants';
import GarageHandler from './GarageHandler';
import GarageView from '../views/GarageView';

export default class Paginator {
  communicator = new Communicator();

  handler = new GarageHandler();

  async prevPage() {
    const cars = await this.communicator
      .getCars(GarageView.getInstance().pageCount -= 1, CARS_PER_PAGE);
    this.handler.updatePage(cars);
  }

  async nextPage() {
    const cars = await this.communicator
      .getCars(GarageView.getInstance().pageCount += 1, CARS_PER_PAGE);
    this.handler.updatePage(cars);
  }
}
