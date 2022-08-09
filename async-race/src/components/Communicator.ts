import { CarType, CarParams, WinnerParams } from '../utils/types';

enum Paths {
  cars = '/garage',
  baseURL = 'http://127.0.0.1:3000',
  page = '_page=',
  limit = '_limit=',
  engine = '/engine',
  winners = '/winners',
  sort = '_sort=',
  order = '_order=',
}

export default class Communicator {
  async getCars(page: number, limit: number): Promise<CarType[]> {
    const response = await fetch(`${Paths.baseURL}${Paths.cars}?${Paths.page}${page}&${Paths.limit}${limit}`);
    return response.json();
  }

  async getCar(id: string | number):Promise <CarType> {
    const response = await fetch(`${Paths.baseURL}${Paths.cars}/${id}`);
    return response.json();
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

  async getTotalItems(): Promise<string | null> {
    const response = await fetch(`${Paths.baseURL}${Paths.cars}?${Paths.limit}0`);
    return response.headers.get('X-Total-Count');
  }

  async startEngine(id: string): Promise<{ velocity: number, distance: number }> {
    const response = await fetch(`${Paths.baseURL}${Paths.engine}?id=${id}&status=started`, {
      method: 'PATCH',
    });
    const params = await response.json();
    return params;
  }

  async stopEngine(id: string | number): Promise<CarType> {
    const response = await fetch(`${Paths.baseURL}${Paths.engine}?id=${id}&status=stopped`, {
      method: 'PATCH',
    });
    const params = await response.json();
    return params;
  }

  async driveEngine(id: string) {
    try {
      const response = await fetch(`${Paths.baseURL}${Paths.engine}?id=${id}&status=drive`, { method: 'PATCH' });
      return await response.json();
    } catch (err) {
      return { success: false };
    }
  }

  async getWinners(
    page?: number,
    limit?: number,
    sort?: 'wins' | 'time',
    order?: 'ASC' | 'DESC',
  ): Promise<{ winners: Promise<WinnerParams[]>; count: string | null; }> {
    const response = await fetch(`${Paths.baseURL}${Paths.winners}?${Paths.page}${page}&${Paths.limit}${limit}&${Paths.sort}${sort}&${Paths.order}${order}`);
    const winners = await response.json();
    const count = response.headers.get('X-Total-Count');
    return { winners, count };
  }

  async getWinner(id: string | number): Promise<WinnerParams> {
    const response = await fetch(`${Paths.baseURL}${Paths.winners}/${id}`);
    return response.json();
  }

  async createWinner(params: WinnerParams) {
    const response = await fetch(`${Paths.baseURL}${Paths.winners}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    return response;
  }

  async updateWinner(params: WinnerParams) {
    const { id, wins, time } = params;
    const response = await fetch(`${Paths.baseURL}${Paths.winners}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ wins, time }),
    });
    return response;
  }

  async removeWinner(id: string | number) {
    await fetch(`${Paths.baseURL}${Paths.winners}/${id}`, {
      method: 'DELETE',
    });
  }
}
