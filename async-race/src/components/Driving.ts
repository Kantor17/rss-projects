import Communicator from './Communicator';
import { instance as garageView } from '../views/GarageView';
import { Finisher } from '../utils/types';
import winnersHandler from './WinnersHandler';

export default class {
  communicator = new Communicator();

  winnersHandler = winnersHandler;

  async startEngine(carE: HTMLElement) {
    carE.classList.add('onDrive');
    const startBtn = (carE.querySelector('.car-start') as HTMLElement);
    startBtn.className = 'car-start waiting';
    const { velocity, distance } = await this.communicator.startEngine(carE.dataset.id as string);
    startBtn.className = 'car-start btn-disabled';
    const returnBtn = carE.querySelector('.car-return') as HTMLElement;
    returnBtn.classList.remove('btn-disabled');
    const time = distance / velocity;
    const car = await this.startDriving(time, carE);
    if (car) return { car, time };
    return Promise.reject(new Error('Unsuccessful drive'));
  }

  async startDriving(duration: number, carE: HTMLElement) {
    const { model, trackWidth, step } = this.getAnimationParams(carE, duration);
    let currentX = 0;
    let animationId = 0;
    const tick = () => {
      currentX += step;
      model.style.transform = `translateX(${currentX}px)`;
      if (currentX < trackWidth) {
        animationId = requestAnimationFrame(tick);
        const carDataset = carE.dataset;
        carDataset.animationId = animationId.toString();
      }
    };
    tick();

    let isDriving = true;
    const returnBtn = carE.querySelector('.car-return') as HTMLElement;
    returnBtn.addEventListener('click', async () => {
      isDriving = await this.returnCar(carE, animationId);
    });

    const drivingRes = await this.communicator.driveEngine(carE.dataset.id as string);
    cancelAnimationFrame(animationId);
    if (isDriving && carE.parentNode && drivingRes.success) {
      return carE;
    }
    return null;
  }

  async returnCar(carE: HTMLElement, animationId: number) {
    cancelAnimationFrame(animationId);
    carE.classList.remove('onDrive');
    const returnBtn = carE.querySelector('.car-return') as HTMLElement;
    returnBtn.className = 'car-return waiting';
    await this.communicator.stopEngine(carE.dataset.id as string);
    const carModel = (carE.querySelector('.car-model') as HTMLElement);
    carModel.style.transform = 'translateX(0px)';
    const startBtn = carE.querySelector('.car-start') as HTMLElement;
    startBtn.classList.remove('btn-disabled');
    returnBtn.className = 'car-return btn-disabled';
    return false;
  }

  getAnimationParams(carE: HTMLElement, duration: number) {
    const model = carE.querySelector('.car-model') as HTMLElement;
    const trackWidth = (carE.querySelector('.car-track') as HTMLElement).offsetWidth - model.offsetWidth;
    const durationInSec = duration / 1000;
    const FRAMES_PER_SECOND = 60;
    const framesCount = durationInSec * FRAMES_PER_SECOND;
    const step = trackWidth / framesCount;
    return { model, trackWidth, step };
  }

  async startRace(cars: HTMLElement[], raceBtn: HTMLElement) {
    if (garageView.checkForDrivingCars()) {
      alert('You need to return all cars to their initial place in order to start a race');
    } else {
      raceBtn.classList.add('btn-disabled');
      const { viewE } = garageView;
      viewE.querySelectorAll('.pagination > *').forEach((btn) => {
        btn.classList.add('btn-disabled');
      });
      viewE.querySelector('.reset-btn')?.classList.add('btn-disabled');
      const promises = cars.map((car) => this.startEngine(car));
      try {
        this.makeWinner(await Promise.any(promises));
      } catch (err) {
        this.makeWinner(null);
      }
    }
  }

  makeWinner(finisher: Finisher | null) {
    const winnerMessage = garageView.createElement('div', 'winner-message');
    if (finisher) {
      const seconds = +(finisher.time / 1000).toFixed(2);
      const name = finisher.car.querySelector('.car-name')?.textContent as string;
      winnerMessage.textContent = `${name} finished first in ${seconds}s.`;
      this.winnersHandler.makeWinner(+(finisher.car.dataset.id as string), seconds);
    } else {
      winnerMessage.textContent = 'There are no winner';
    }
    const { viewE } = garageView;
    viewE.append(winnerMessage);
    viewE.querySelector('.reset-btn')?.classList.remove('btn-disabled');
  }

  resetRace(cars: HTMLElement[], resetBtn: HTMLElement) {
    resetBtn.classList.add('btn-disabled');
    const { viewE } = garageView;
    viewE.querySelector('.winner-message')?.remove();
    cars.forEach((car) => {
      const carAnimationId = +(car.dataset.animationId as string);
      this.returnCar(car, carAnimationId);
    });
    viewE.querySelector('.race-btn')?.classList.remove('btn-disabled');
    garageView.checkPaginationButtons(garageView);
  }
}
