import Template from './Template';

export default class extends Template {
  createView() {
    const view = document.createElement('div');
    view.append(this.createTitle('Garage'), this.createCarsManager(), this.createPageCounter());
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
}
