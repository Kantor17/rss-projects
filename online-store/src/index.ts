import './style.css';
import Catalog from './components/Catalog';
import books from './components/books.json';

const catalog = new Catalog(document.querySelector('.catalog') as HTMLElement);
catalog.update(books);
