import './style.css';
import Catalog from './components/Catalog';
import Filter from './components/Filter';
import { FilterNames } from './helpers/types';
import { convertToNumbers } from './helpers/utils';
import sliders from './components/sliders';
import Cart from './components/Cart';
import Resetter from './components/Resetter';

const catalog = Catalog.getInstance();
(document.querySelector('#sort') as HTMLElement).addEventListener('click', (event: MouseEvent) => {
  const option = (event.target as HTMLElement).dataset.option as string;
  if (option) {
    catalog.sorter.currentOption = option;
    catalog.sorter.sort();
  }
});

const filter = Filter.getInstance();
sliders.forEach((slider) => {
  slider.noUiSlider?.on('change', (values) => {
    const filterName = slider.dataset.name as FilterNames;
    filter.addToFilters(filterName, convertToNumbers(values));
    filter.filter();
  });
});

document.querySelector('#filters')?.addEventListener('click', (event) => {
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

const search = document.querySelector('#search-field') as HTMLInputElement;
search.addEventListener('search', () => {
  filter.currentFilters.searchQuery = search.value.toLowerCase().trim();
  filter.filter();
});
document.querySelector('#search-btn')?.addEventListener('click', () => {
  filter.currentFilters.searchQuery = search.value.toLowerCase().trim();
  filter.filter();
});

filter.initFilters();

const cart = Cart.getInstance();
cart.updateCounter();
catalog.element.addEventListener('click', (event) => {
  if ((event.target as HTMLElement).closest('.card__cart')) {
    cart.updateCart((event.target as HTMLElement).closest('.card') as HTMLElement);
  }
});

const resetter = new Resetter();
document.querySelector('#reset-filters')?.addEventListener('click', () => {
  resetter.resetFilters();
});
document.querySelector('#reset-settings')?.addEventListener('click', () => {
  resetter.resetSettings();
});
