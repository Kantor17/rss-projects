import { BookType } from './types';

export function minFrom<T>(source: T[], property: keyof T): number {
  return Math.min(...source.map((item) => Number(item[property])));
}

export function maxFrom<T>(source: T[], property: keyof T): number {
  return Math.max(...source.map((item) => Number(item[property])));
}

export function createCards(newBooks: BookType[]): HTMLElement[] {
  return newBooks.map((book) => {
    const card: HTMLElement = document.createElement('div');
    card.className = 'card';

    const lang: HTMLElement = document.createElement('div');
    lang.className = 'card__language';
    const langImg = document.createElement('img');
    langImg.src = book.language === 'ua' ? './assets/ukraine-icon.svg' : './assets/english-icon.svg';
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
    genre.textContent = `Genre: ${book.genre}`;

    const release = document.createElement('p');
    genre.className = 'card__release';
    release.textContent = `Released in ${book.releaseDate}`;
    card.dataset.date = book.releaseDate;

    const order = document.createElement('div');
    order.className = 'card__order';
    const amount = document.createElement('p');
    amount.className = 'card__amount';
    amount.textContent = `In stock: ${book.amount} pcs`;
    const cart = document.createElement('button');
    cart.className = 'card__cart';
    const cartImg = document.createElement('img');
    cartImg.src = './assets/cart-add.svg';
    cartImg.alt = 'cart';
    cart.append(cartImg);
    order.append(amount, cart);

    card.append(lang, image, name, author, genre, release, order);

    if (book.isBestseller) {
      const badge = document.createElement('div');
      badge.className = 'card__badge';
      const bageImg = document.createElement('img');
      bageImg.src = './assets/best-seller.svg';
      bageImg.alt = 'Best seller';
      badge.append(bageImg);
      card.append(badge);
    }
    return card;
  });
}

export const convertToNumbers = <T>(arr: T[]): number[] => arr.map((elem) => +elem);
