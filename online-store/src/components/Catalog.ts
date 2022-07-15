import { BookType } from './types';
import Sorter from './Sorter';
import { createCards } from './utils';

export default class Catalog {
  element: HTMLElement;

  sorter: Sorter;

  // eslint-disable-next-line no-use-before-define
  private static Instance: Catalog;

  constructor() {
    this.element = document.querySelector('#catalog') as HTMLElement;
    this.sorter = new Sorter(this.element);
  }

  static getInstace(): Catalog {
    if (!Catalog.Instance) Catalog.Instance = new Catalog();
    return Catalog.Instance;
  }

  update(newBooks: BookType[]): void {
    const cards = createCards(newBooks);
    if (cards.length > 0) {
      this.element.replaceChildren(...cards);
    } else {
      const emptyMessage = document.createElement('h2');
      emptyMessage.className = 'empty-message';
      emptyMessage.textContent = 'Sorry, no matching books found';
      this.element.replaceChildren(emptyMessage);
    }
    this.sorter.sort();
  }
}
