/* eslint-disable no-param-reassign */
import sliders from './sliders';
import Catalog from './Catalog';
import books from '../data/books.json';
import { FilterType, FilterNames } from '../helpers/types';
import { minFrom, maxFrom } from '../helpers/utils';
import CardBuilder from './CardBuilder';

export default class Filter {
  private static Instance: Filter;

  catalog: Catalog;

  currentFilters: FilterType;

  cardBuilder: CardBuilder;

  constructor() {
    this.catalog = Catalog.getInstance();
    this.cardBuilder = new CardBuilder();
    this.currentFilters = localStorage.getItem('filters') ? JSON.parse(localStorage.getItem('filters') as string)
      : {
        authorFilter: [],
        genreFilter: [],
        languageFilter: [],
        bestsellerFilter: false,
        dateFilter: [minFrom(books, 'releaseDate'), maxFrom(books, 'releaseDate')],
        amountFilter: [minFrom(books, 'amount'), maxFrom(books, 'amount')],
        searchQuery: '',
      };
  }

  static getInstance() {
    if (!Filter.Instance) Filter.Instance = new Filter();
    return Filter.Instance;
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

  isFilteredBy<T>(filter: T, value: string | boolean) {
    if (Array.isArray(filter)) {
      if (typeof filter[0] === 'number') {
        return +value >= filter[0] && +value <= filter[1];
      }
      return filter.includes(value) || filter.length === 0;
    }
    if (typeof filter === 'boolean') {
      return value === true || filter === false;
    }
    if (typeof filter === 'string' && typeof value === 'string') {
      return value.toLowerCase().includes(filter);
    }
    return false;
  }

  filter() {
    let cardsCount = 0;
    const {
      authorFilter, genreFilter, languageFilter, bestsellerFilter,
      dateFilter, amountFilter, searchQuery,
    } = this.currentFilters;
    books.forEach((book) => {
      const currentCard = Array.from(this.catalog.element.children)
        .find((item) => ((item as HTMLElement).dataset.id === book.id));
      if (this.isFilteredBy(authorFilter, book.author)
        && this.isFilteredBy(genreFilter, book.genre)
        && this.isFilteredBy(languageFilter, book.language)
        && this.isFilteredBy(bestsellerFilter, book.isBestseller)
        && this.isFilteredBy(dateFilter, book.releaseDate)
        && this.isFilteredBy(amountFilter, book.amount)
        && this.isFilteredBy(searchQuery, book.name)) {
        cardsCount += 1;
        if (!currentCard) {
          this.catalog.element.append(this.cardBuilder.build(book));
        }
      } else if (currentCard) this.catalog.element.removeChild(currentCard);
    });
    this.catalog.update(cardsCount < 1);
    localStorage.setItem('filters', JSON.stringify(this.currentFilters));
  }

  initFilters() {
    (document.querySelectorAll('.filter__item input') as NodeListOf<HTMLInputElement>).forEach(((input) => {
      const checkboxFilters = [this.currentFilters.authorFilter,
        this.currentFilters.genreFilter, this.currentFilters.languageFilter];
      if (checkboxFilters.some((filter) => filter
        .includes(input.dataset.filter as string))) {
        input.checked = true;
      }
    }));

    if (this.currentFilters.bestsellerFilter) (document.querySelector('#bestseller-input') as HTMLInputElement).checked = true;

    const [dateSlider, amountSlider] = sliders;
    dateSlider.noUiSlider?.set(this.currentFilters.dateFilter);
    amountSlider.noUiSlider?.set(this.currentFilters.amountFilter);

    (document.querySelector('#search-field') as HTMLInputElement).value = this.currentFilters.searchQuery;

    this.filter();
  }
}
