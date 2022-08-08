export type CarType = {
  name: string;
  color: string;
  id: number;
};

export type CarParams = Omit<CarType, 'id'>;

export type Finisher = {
  car: HTMLElement,
  time: number,
};
