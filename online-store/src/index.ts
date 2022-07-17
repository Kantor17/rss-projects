import './style.css';
import Catalog from './components/Catalog';
import Filter from './components/Filter';
import { FilterNames } from './components/types';
import { convertToNumbers } from './components/utils';
import sliders from './components/sliders';
import Cart from './components/Cart';
import Reseter from './components/Reseter';

const catalog = Catalog.getInstace();
(document.querySelector('#sort') as HTMLElement).addEventListener('click', (event: MouseEvent) => {
  const option = (event.target as HTMLElement).dataset.option as string;
  if (option) {
    catalog.sorter.currentOption = option;
    catalog.sorter.sort();
    (event.target as HTMLElement).parentNode?.querySelector('._active')?.classList.remove('_active');
    (event.target as HTMLElement).classList.add('_active');
  }
});

const filter = new Filter();
sliders.forEach((slider) => {
  slider.noUiSlider?.on('set', (values) => {
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
  filter.currentFilters.searchQuerry = search.value.toLowerCase().trim();
  filter.filter();
});
document.querySelector('#search-btn')?.addEventListener('click', () => {
  filter.currentFilters.searchQuerry = search.value.toLowerCase().trim();
  filter.filter();
});

filter.filter();

catalog.element.addEventListener('click', (event) => {
  if ((event.target as HTMLElement).closest('.card__cart')) {
    Cart.getInstace().updateCart((event.target as HTMLElement).closest('.card') as HTMLElement);
  }
});

const reseter = new Reseter();
document.querySelector('#reset-filters')?.addEventListener('click', () => {
  reseter.resetFilters();
});
