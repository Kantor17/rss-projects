import * as noUiSlider from 'nouislider';
import Filter from './Filter';
import sliders from './sliders';
import { minFrom, maxFrom } from './utils';
import books from './books.json';

export default class {
  checkboxes: NodeListOf<Element>;

  dateSlider: noUiSlider.target;

  amountSlider: noUiSlider.target;

  searchField: HTMLInputElement;

  searchBtn: HTMLElement;

  constructor() {
    this.checkboxes = document.querySelectorAll('.filter__item input');
    [this.dateSlider, this.amountSlider] = sliders;
    this.searchField = document.querySelector('#search-field') as HTMLInputElement;
    this.searchBtn = document.querySelector('#search-btn') as HTMLElement;
  }

  resetFilters() {
    const filter = Filter.getInstance();
    filter.currentFilters = {
      authorFilter: [],
      genreFilter: [],
      languageFilter: [],
      bestsellerFilter: false,
      dateFilter: [minFrom(books, 'releaseDate'), maxFrom(books, 'releaseDate')],
      amountFilter: [minFrom(books, 'amount'), maxFrom(books, 'amount')],
      searchQuery: '',
    };
    this.checkboxes.forEach((checkbox) => {
      // eslint-disable-next-line no-param-reassign
      if ((checkbox as HTMLInputElement).checked) (checkbox as HTMLInputElement).checked = false;
    });
    this.dateSlider.noUiSlider?.reset();
    this.amountSlider.noUiSlider?.reset();
    this.searchField.value = '';
    filter.filter();
  }

  resetSettings() {
    localStorage.clear();
    document.location.reload();
  }
}
