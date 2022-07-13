import './style.css';
import * as noUiSlider from 'nouislider';
import Catalog from './components/Catalog';
import books from './components/books.json';
import Sorter from './components/Sorter';
import Filter from './components/Filter';
import { FilterNames } from './components/types';
import { minFrom, maxFrom, convertToNumbers } from './components/utils';

const catalog = new Catalog();
catalog.update(books);

const sorter = new Sorter();
(document.querySelector('#sort') as HTMLElement).addEventListener('click', (event: MouseEvent) => {
  switch ((event.target as HTMLElement).dataset.option) {
    case 'nameDesc':
      sorter.nameDescending();
      break;
    case 'nameAsc':
      sorter.nameAscending();
      break;
    case 'dateDesc':
      sorter.dateDescending();
      break;
    case 'dateAsc':
      sorter.dateAscending();
      break;
    default:
      sorter.nameAscending();
  }
});

const dateSlider = document.querySelector('#date-slider') as noUiSlider.target;
const minDate = minFrom(books, 'releaseDate');
const maxDate = maxFrom(books, 'releaseDate');
noUiSlider.create(dateSlider, {
  start: [minDate, maxDate],
  connect: true,
  step: 1,
  tooltips: true,
  range: {
    min: minDate,
    max: maxDate,
  },
  format: {
    from(value) {
      return Number(value);
    },
    to(value) {
      return value.toFixed(0);
    },
  },
});
const amountSlider = document.querySelector('#amount-slider') as noUiSlider.target;
const minAmount = minFrom(books, 'amount');
const maxAmount = maxFrom(books, 'amount');
noUiSlider.create(amountSlider, {
  start: [minAmount, maxAmount],
  connect: true,
  range: {
    min: minAmount,
    max: maxAmount,
  },
  tooltips: true,
  format: {
    from(value) {
      return Number(value);
    },
    to(value) {
      return value.toFixed(0);
    },
  },
});

const filter = new Filter();

[dateSlider, amountSlider].forEach((slider) => {
  slider.noUiSlider?.on('change', (values) => {
    const filterName = slider.dataset.name as FilterNames;
    filter.addToFilters(filterName, convertToNumbers(values));
    filter.filter();
  });
});

(document.querySelector('#filters') as HTMLElement).addEventListener('click', (event) => {
  if (event.target instanceof HTMLInputElement) {
    const filterName = (event.target.closest('.filter__list') as HTMLElement).dataset.name as FilterNames;
    if (event.target.checked) {
      filter.addToFilters(filterName, event.target.dataset.filter as string);
    } else {
      filter.removeFromFilters(filterName, event.target.dataset.filter as string);
    }
    filter.filter();
  }
});
