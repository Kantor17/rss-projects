import Sorter from './Sorter';

export default class Catalog {
  element: HTMLElement;

  sorter: Sorter;

  private static Instance: Catalog;

  constructor() {
    this.element = document.querySelector('#catalog') as HTMLElement;
    this.sorter = new Sorter(this.element);
  }

  static getInstance(): Catalog {
    if (!Catalog.Instance) Catalog.Instance = new Catalog();
    return Catalog.Instance;
  }

  update(isEmpty: boolean): void {
    if (isEmpty) {
      const emptyMessage = document.createElement('h2');
      emptyMessage.className = 'empty-message';
      emptyMessage.textContent = 'Sorry, no matching books found';
      this.element.replaceChildren(emptyMessage);
    } else {
      const emptyMessage = document.querySelector('.empty-message');
      if (emptyMessage) this.element.removeChild(emptyMessage);
      this.sorter.sort();
    }
  }
}
