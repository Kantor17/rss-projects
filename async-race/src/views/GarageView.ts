import Template from './Template';

export default class extends Template {
  createView() {
    const view = document.createElement('div');
    view.className = 'garage-view';
    const cars = this.createCars();
    cars.append(this.createCar());
    view.append(
      this.createTitle('Garage'),
      this.createCarsManager(),
      this.createPageCounter(),
      this.createControls(),
      cars,
      this.createPagination(),
    );
    return view;
  }

  createCarsManager() {
    const carsManager = document.createElement('div');
    carsManager.innerHTML = `
    <div class="cars-manager">
      <div class="car-creation">
        <input type="text" class="car-name">
        <input type="color" class="car-color">
        <button class="creation-btn">Create</button>
      </div>
      <div class="car-update">
        <input type="text" class="car-name">
        <input type="color" class="car-color">
        <button class="update-btn">Update</button>
      </div>
    </div>`;
    return carsManager.children[0];
  }

  createControls() {
    const controls = document.createElement('div');
    controls.innerHTML = `
    <div class="controls">
      <button class="race-btn btn-primary">Race</button>
      <button class="reset-btn btn-primary">Reset</button>
      <button class="generate-btn btn-long">Generate cars</button>
    </div>`;
    return controls.children[0];
  }

  createCars() {
    const track = document.createElement('div');
    track.innerHTML = '<div class="cars"></div>';
    return track.children[0];
  }

  createCar() {
    const car = document.createElement('div');
    car.innerHTML = `
    <div class="car">
      <h3 class="car-name">Tesla</h3>
      <div class="car-tools">
        <button class="car-select">Select</button>
        <button class="car-remove">Remove</button>
      </div>
      <div class="car-controls">
        <button class="car-start">Start</button>
        <button class="car-stop btn-disabled">Stop</button>
      </div>
      <div class="car-track">
        <div class="car-model">
          <img src="../assets/car.svg" alt="tesla">
        </div>
        <div class="finish">
          <img src="../assets/finish-flag.svg" alt="finish">
        </div>
      </div>
    </div>`;
    return car.children[0];
  }
}
