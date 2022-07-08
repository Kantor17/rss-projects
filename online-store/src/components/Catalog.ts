import { BookType } from './types';

export default class Catalog {
  element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  update(newBooks: BookType[]): void {
    newBooks.forEach((book) => {
      const card: HTMLElement = document.createElement('div');
      card.className = 'card';

      const lang: HTMLElement = document.createElement('div');
      lang.className = 'card__language';
      const langImg = document.createElement('img');
      langImg.src = './assets/ukraine-icon.svg';
      langImg.alt = book.language;
      lang.append(langImg);

      const image: HTMLElement = document.createElement('div');
      image.className = 'card__image';
      const imageImg = document.createElement('img');
      imageImg.src = book.posterPath;
      imageImg.alt = `${book.name} poster`;
      image.append(imageImg);

      const name = document.createElement('p');
      name.className = 'card__name';
      name.textContent = book.name;

      const author = document.createElement('p');
      author.className = 'card__author';
      author.textContent = book.author;

      const genre = document.createElement('p');
      genre.className = 'card__genre';
      genre.textContent = book.genre;

      const release = document.createElement('p');
      genre.className = 'card__release';
      release.textContent = `Released in ${book.releaseDate}`;

      const order = document.createElement('div');
      order.className = 'card__order';
      const amount = document.createElement('p');
      amount.className = 'card__amount';
      amount.textContent = 'In stock 100 pcs';
      const cart = document.createElement('button');
      cart.className = 'card__cart';
      const cartImg = document.createElement('img');
      cartImg.src = './assets/cart-add.svg';
      cartImg.alt = 'cart';
      cart.append(cartImg);
      order.append(amount, cart);

      card.append(lang, image, name, author, genre, release, order);

      this.element.append(card);
    });
  }
}
