import './style.css';
import Catalog from './components/Catalog';
import books from './components/books.json';
import Sorter from './components/Sorter';

const catalog: Catalog = new Catalog(document.querySelector('#catalog') as HTMLElement);
catalog.update(books);

const sorter: Sorter = new Sorter();
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
