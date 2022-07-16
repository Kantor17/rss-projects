export type BookType = {
  id: string;
  name: string,
  author: string,
  genre: string,
  releaseDate: string,
  amount: string,
  language: string,
  isBestseller: boolean;
  posterPath: string;
}

export type FilterType = {
  authorFilter: string[];
  genreFilter: string[];
  languageFilter: string[];
  bestsellerFilter: boolean;
  dateFilter: number[];
  amountFilter: number[];
  searchQuerry: string;
}

export enum FilterNames {
  author = 'authorFilter',
  genre = 'genreFilter',
  language = 'languageFilter',
  bestseller = 'bestsellerFilter',
  date = 'dateFilter',
  amount = 'amountFilter',
}
