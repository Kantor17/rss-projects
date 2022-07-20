/* eslint-disable no-param-reassign */
import sliders from './sliders';
import Catalog from './Catalog';
import books from '../data/books.json';
import { FilterType, FilterNames } from './types';
import { minFrom, maxFrom, createCard } from '../helpers/utils';

export default class Filter {
  private static Instance: Filter;

  catalog: Catalog;

  currentFilters: FilterType;

  constructor() {
    this.catalog = Catalog.getInstance();
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

  filter() {
    let cardsCount = 0;
    books.forEach((book) => {
      const currentCard = Array.from(this.catalog.element.children)
        .find((item) => ((item as HTMLElement).dataset.id === book.id));
      if ((this.currentFilters.authorFilter.includes(book.author)
        || this.currentFilters.authorFilter.length === 0)
      && (this.currentFilters.genreFilter.includes(book.genre)
        || this.currentFilters.genreFilter.length === 0)
      && (this.currentFilters.languageFilter.includes(book.language)
        || this.currentFilters.languageFilter.length === 0)
      && (book.isBestseller === true || this.currentFilters.bestsellerFilter === false)
      && (+book.releaseDate >= this.currentFilters.dateFilter[0]
        && +book.releaseDate <= this.currentFilters.dateFilter[1])
      && (+book.amount >= this.currentFilters.amountFilter[0]
        && +book.amount <= this.currentFilters.amountFilter[1])
      && book.name.toLowerCase().includes(this.currentFilters.searchQuery)) {
        cardsCount += 1;
        if (!currentCard) {
          this.catalog.element.append(createCard(book));
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
