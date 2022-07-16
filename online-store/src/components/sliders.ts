import * as noUiSlider from 'nouislider';
import { minFrom, maxFrom } from './utils';
import books from './books.json';

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
export default [dateSlider, amountSlider];
