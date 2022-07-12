import Catalog from './Catalog';
import books from './books.json';
import { FilterType } from './types';

export default class Filter {
  catalog: Catalog;

  currentFilters: FilterType;

  constructor() {
    this.catalog = new Catalog();
    this.currentFilters = {
      authorFilter: [],
      genreFilter: [],
      languageFilter: [],
      bestsellerFilter: false,
    };
  }

  filter() {
    const filtered = books.filter((book) => {
      if ((this.currentFilters.authorFilter.includes(book.author)
        || this.currentFilters.authorFilter.length === 0)
      && (this.currentFilters.genreFilter.includes(book.genre)
        || this.currentFilters.genreFilter.length === 0)
      && (this.currentFilters.languageFilter.includes(book.language)
        || this.currentFilters.languageFilter.length === 0)
      && (book.isBestseller === true || this.currentFilters.bestsellerFilter === false)) {
        return true;
      }
      return false;
    });
    console.log(filtered);
    this.catalog.update(filtered);
  }
}
