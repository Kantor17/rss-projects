import Catalog from './Catalog';
import books from './books.json';
import { FilterType, FilterNames } from './types';
import { minFrom, maxFrom } from './utils';

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
      dateFilter: [minFrom(books, 'releaseDate'), maxFrom(books, 'releaseDate')],
      amountFilter: [minFrom(books, 'amount'), maxFrom(books, 'amount')],
    };
  }

  addToFilters(filterName: FilterNames, value: undefined | string | number[]) {
    switch (typeof value) {
      case 'undefined':
        (this.currentFilters[filterName] as boolean) = true;
        break;
      case 'string':
        (this.currentFilters[filterName] as string[]).push(value);
        break;
      case 'object':
        (this.currentFilters[filterName] as number[]) = value;
        break;
      default:
        console.log('Something went wrong');
    }
  }

  removeFromFilters(filterName: FilterNames, value: undefined | string) {
    switch (typeof value) {
      case 'undefined':
        (this.currentFilters[filterName] as boolean) = false;
        break;
      case 'string':
        (this.currentFilters[filterName] as string[])
          .splice((this.currentFilters[filterName] as string[])
            .indexOf(value), 1);
        break;
      default:
        console.log('Something went wrong');
    }
  }

  filter() {
    const filtered = books.filter((book) => {
      if ((this.currentFilters.authorFilter.includes(book.author)
        || this.currentFilters.authorFilter.length === 0)
      && (this.currentFilters.genreFilter.includes(book.genre)
        || this.currentFilters.genreFilter.length === 0)
      && (this.currentFilters.languageFilter.includes(book.language)
        || this.currentFilters.languageFilter.length === 0)
      && (book.isBestseller === true || this.currentFilters.bestsellerFilter === false)
      && (+book.releaseDate >= this.currentFilters.dateFilter[0]
        && +book.releaseDate <= this.currentFilters.dateFilter[1])
      && (+book.amount > this.currentFilters.amountFilter[0]
        && +book.amount <= this.currentFilters.amountFilter[1])) {
        return true;
      }
      return false;
    });
    this.catalog.update(filtered);
  }
}
