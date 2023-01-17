import {
  CarType, CarParams, WinnerParams, OrderType, SortType,
} from '../utils/types';

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
  defaultHeaders = {
    'Content-Type': 'application/json',
  };

  getCars(page: number, limit: number): Promise<CarType[]> {
    return fetch(`${Paths.baseURL}${Paths.cars}?${Paths.page}${page}&${Paths.limit}${limit}`)
      .then((response) => response.json());
  }

  getCar(id: string | number):Promise <CarType> {
    return fetch(`${Paths.baseURL}${Paths.cars}/${id}`).then((response) => response.json());
  }

  addCar(params: CarParams): Promise<CarType> {
    return fetch(`${Paths.baseURL}${Paths.cars}`, {
      method: 'POST',
      headers: this.defaultHeaders,
      body: JSON.stringify(params),
    }).then((response) => response.json());
  }

  async removeCar(id: string) {
    await fetch(`${Paths.baseURL}${Paths.cars}/${id}`, {
      method: 'DELETE',
    });
  }

  async updateCar(id: string, params: CarParams) {
    await fetch(`${Paths.baseURL}${Paths.cars}/${id}`, {
      method: 'PUT',
      headers: this.defaultHeaders,
      body: JSON.stringify(params),
    });
  }

  getTotalItems(): Promise<string | null> {
    return fetch(`${Paths.baseURL}${Paths.cars}?${Paths.limit}0`)
      .then((response) => response.headers.get('X-Total-Count'));
  }

  startEngine(id: string): Promise<{ velocity: number, distance: number }> {
    return fetch(`${Paths.baseURL}${Paths.engine}?id=${id}&status=started`, {
      method: 'PATCH',
    }).then((response) => response.json());
  }

  stopEngine(id: string | number): Promise<Response> {
    return fetch(`${Paths.baseURL}${Paths.engine}?id=${id}&status=stopped`, {
      method: 'PATCH',
    });
  }

  driveEngine(id: string): Promise<{ success: boolean }> {
    return fetch(`${Paths.baseURL}${Paths.engine}?id=${id}&status=drive`, { method: 'PATCH' })
      .then((response) => response.json())
      .catch(() => ({ success: false }));
  }

  async getWinners(
    page?: number,
    limit?: number,
    sort?: SortType,
    order?: OrderType,
  ): Promise<{ winners: Promise<WinnerParams[]>, count: string | null }> {
    const response = await fetch(`${Paths.baseURL}${Paths.winners}?${Paths.page}${page}&${Paths.limit}${limit}&${Paths.sort}${sort}&${Paths.order}${order}`);
    const winners = await response.json();
    const count = response.headers.get('X-Total-Count');
    return { winners, count };
  }

  getWinner(id: string | number): Promise<WinnerParams> {
    return fetch(`${Paths.baseURL}${Paths.winners}/${id}`).then((response) => response.json());
  }

  createWinner(params: WinnerParams) {
    return fetch(`${Paths.baseURL}${Paths.winners}`, {
      method: 'POST',
      headers: this.defaultHeaders,
      body: JSON.stringify(params),
    });
  }

  updateWinner(params: WinnerParams) {
    const { id, wins, time } = params;
    return fetch(`${Paths.baseURL}${Paths.winners}/${id}`, {
      method: 'PUT',
      headers: this.defaultHeaders,
      body: JSON.stringify({ wins, time }),
    });
  }

  async removeWinner(id: string | number) {
    await fetch(`${Paths.baseURL}${Paths.winners}/${id}`, {
      method: 'DELETE',
    });
  }
}
