import Communicator from './Communicator';

export default class {
  communicator = new Communicator();

  async startEngine(carE: HTMLElement) {
    const startBtn = (carE.querySelector('.car-start') as HTMLElement);
    startBtn.className = 'car-start waiting';
    const { velocity, distance } = await this.communicator.startEngine(carE.dataset.id as string);
    startBtn.className = 'car-start btn-disabled';
    const returnBtn = carE.querySelector('.car-return') as HTMLElement;
    returnBtn.classList.remove('btn-disabled');
    this.startDriving(distance / velocity, carE);
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
      }
      return animationId;
    };
    tick();

    let isDriving = true;
    const returnBtn = carE.querySelector('.car-return') as HTMLElement;
    returnBtn.addEventListener('click', async () => {
      isDriving = false;
      returnBtn.className = 'car-return waiting';
      await this.communicator.stopEngine(carE.dataset.id as string);
      cancelAnimationFrame(animationId);
      model.style.transform = 'translateX(0px)';
      returnBtn.className = 'car-return btn-disabled';
      (carE.querySelector('.car-start') as HTMLElement).classList.remove('btn-disabled');
    });

    const drivingRes = await this.communicator.driveEngine(carE.dataset.id as string);
    if (isDriving && carE.parentNode) {
      cancelAnimationFrame(animationId);
      if (drivingRes.status === 200) {
        console.log('finished');
      } else if (drivingRes.status === 500) {
        console.log('broke');
      }
    }
  }

  getAnimationParams(carE: HTMLElement, duration: number) {
    const model = carE.querySelector('.car-model') as HTMLElement;
    const trackWidth = (carE.querySelector('.car-track') as HTMLElement).offsetWidth - model.offsetWidth;
    const framesCount = (duration / 1000) * 60;
    const step = trackWidth / framesCount;
    return { model, trackWidth, step };
  }
}
