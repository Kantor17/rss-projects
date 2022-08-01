import Communicator from './Communicator';

export default class {
  communicator: Communicator;

  constructor() {
    this.communicator = new Communicator();
  }

  async handleReading() {
    const cars = await this.communicator.getCars();
    return cars;
  }

  async handleCreation(name: string, color: string) {
    if (name.trim()) {
      const car = {
        name,
        color,
      };
      const resCar = this.communicator.addCar(car);
      return resCar;
    }
    alert('Please enter some name for a car');
    return null;
  }

  async handleDeletion(id: string) {
    this.communicator.removeCar(id);
  }
}
