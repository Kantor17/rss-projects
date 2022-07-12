import './style.css';
import Catalog from './components/Catalog';
import books from './components/books.json';
import Sorter from './components/Sorter';
import Filter from './components/Filter';

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

const filter = new Filter();
(document.querySelector('#filters') as HTMLElement).addEventListener('click', (event) => {
  if (event.target instanceof HTMLInputElement) {
    const filterName = (event.target.closest('.filter__list') as HTMLElement).dataset.name as
     'authorFilter' | 'genreFilter' | 'languageFilter' | 'bestsellerFilter';
    if (event.target.checked) {
      if (filterName === 'bestsellerFilter') {
        filter.currentFilters[filterName] = true;
      } else {
        filter.currentFilters[filterName].push(event.target.dataset.filter as string);
      }
    } else if (filterName === 'bestsellerFilter') {
      filter.currentFilters[filterName] = false;
    } else {
      filter.currentFilters[filterName].splice(filter.currentFilters[filterName]
        .indexOf(event.target.dataset.filter as string), 1);
    }
    filter.filter();
  }
});
