export function minFrom<T>(source: T[], property: keyof T): number {
  return Math.min(...source.map((item) => Number(item[property])));
}

export function maxFrom<T>(source: T[], property: keyof T): number {
  return Math.max(...source.map((item) => Number(item[property])));
}

export const convertToNumbers = <T>(arr: T[]): number[] => arr.map((elem) => +elem);
