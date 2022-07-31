import Communicator from './Communicator';

export default class {
  communicator: Communicator;

  constructor() {
    this.communicator = new Communicator();
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
}
