import { CarType, CarParams } from '../utils/types';

enum Paths {
  cars = '/garage',
  baseURL = 'http://127.0.0.1:3000',
  page = '_page=',
  limit = '_limit=',
  engine = '/engine',
}

export default class Communicator {
  async getCars(page: number, limit: number): Promise<CarType[]> {
    const response = await fetch(`${Paths.baseURL}${Paths.cars}?${Paths.page}${page}&${Paths.limit}${limit}`);
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

  async getTotalItems() {
    const response = await fetch(`${Paths.baseURL}${Paths.cars}?${Paths.limit}0`);
    return response.headers.get('X-Total-Count');
  }

  async startEngine(id: string) {
    const response = await fetch(`${Paths.baseURL}${Paths.engine}?id=${id}&status=started`, {
      method: 'PATCH',
    });
    const params = await response.json();
    return params;
  }

  async stopEngine(id: string) {
    const response = await fetch(`${Paths.baseURL}${Paths.engine}?id=${id}&status=stopped`, {
      method: 'PATCH',
    });
    const params = await response.json();
    return params;
  }

  async driveEngine(id: string) {
    const response = await fetch(`${Paths.baseURL}${Paths.engine}?id=${id}&status=drive`, {
      method: 'PATCH',
    });
    return response;
  }
}
