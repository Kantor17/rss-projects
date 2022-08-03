import GarageView from '../views/GarageView';
import Communicator from './Communicator';
import { CARS_PER_PAGE } from '../utils/constants';

export default class Paginator {
  communicator = new Communicator();

  currentPage = 1;

  async prevPage() {
    const cars = await this.communicator
      .getCars(GarageView.getInstance().pageCount -= 1, CARS_PER_PAGE);
    GarageView.getInstance().updatePage(cars);
  }

  async nextPage() {
    const cars = await this.communicator
      .getCars(GarageView.getInstance().pageCount += 1, CARS_PER_PAGE);
    GarageView.getInstance().updatePage(cars);
  }
}
