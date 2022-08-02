import { CarType, CarParams } from '../utils/types';

enum Paths {
  cars = '/garage',
  baseURL = 'http://127.0.0.1:3000',
}

export default class Communicator {
  async getCars(): Promise<CarType[]> {
    const response = await fetch(`${Paths.baseURL}${Paths.cars}`);
    const data = response.json();
    return data;
  }

  async addCar(params: CarParams): Promise<CarType> {
    const response = await fetch(`${Paths.baseURL}${Paths.cars}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    const resultCar = await response.json();
    return resultCar;
  }

  async removeCar(id: string) {
    await fetch(`${Paths.baseURL}${Paths.cars}/${id}`, {
      method: 'DELETE',
    });
  }

  async updateCar(id: string, params: CarParams) {
    await fetch(`${Paths.baseURL}${Paths.cars}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
  }
}
