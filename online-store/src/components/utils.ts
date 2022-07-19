import { BookType } from './types';
import Cart from './Cart';

export function minFrom<T>(source: T[], property: keyof T): number {
  return Math.min(...source.map((item) => Number(item[property])));
}

export function maxFrom<T>(source: T[], property: keyof T): number {
  return Math.max(...source.map((item) => Number(item[property])));
}

export function createCard(book: BookType): HTMLElement {
  const card: HTMLElement = document.createElement('div');
  card.className = 'card';
  card.dataset.id = book.id;

  const lang: HTMLElement = document.createElement('div');
  lang.className = 'card__language';
  const langImg = document.createElement('img');
  langImg.src = book.language === 'ua' ? './assets/ukraine-icon.svg' : './assets/english-icon.svg';
  langImg.alt = book.language;
  langImg.title = book.language === 'ua' ? 'Ukrainian' : 'English';
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
  card.dataset.name = book.name;

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

  if (Cart.getInstance().incartIds.includes(book.id)) card.classList.add('_incart');

  card.append(lang, image, name, author, genre, release, order);

  if (book.isBestseller) {
    const badge = document.createElement('div');
    badge.className = 'card__badge';
    const badgeImg = document.createElement('img');
    badgeImg.src = './assets/best-seller.svg';
    badgeImg.alt = 'Bestseller';
    badgeImg.title = 'Bestseller';
    badge.append(badgeImg);
    card.append(badge);
  }
  return card;
}

export const convertToNumbers = <T>(arr: T[]): number[] => arr.map((elem) => +elem);
