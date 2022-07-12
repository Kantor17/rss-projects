export type BookType = {
  name: string,
  author: string,
  genre: string,
  releaseDate: number,
  language: string,
  isBestseller: boolean;
  posterPath: string;
}

export type FilterType = {
  authorFilter: string[];
  genreFilter: string[];
  languageFilter: string[];
  bestsellerFilter: boolean
}
