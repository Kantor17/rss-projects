import { BookType } from '../helpers/types';
import Cart from './Cart';

export default class {
  build(book: BookType): HTMLElement {
    const {
      id, name, author, genre, releaseDate, amount,
      language, isBestseller, posterPath,
    } = book;

    const cardE: HTMLElement = document.createElement('div');
    cardE.className = 'card';
    cardE.dataset.id = id;

    const langE: HTMLElement = document.createElement('div');
    langE.className = 'card__language';
    const langImg = document.createElement('img');
    langImg.src = language === 'ua' ? './assets/ukraine-icon.svg' : './assets/english-icon.svg';
    langImg.alt = language;
    langImg.title = language === 'ua' ? 'Ukrainian' : 'English';
    langE.append(langImg);

    const imageE: HTMLElement = document.createElement('div');
    imageE.className = 'card__image';
    const imageImg = document.createElement('img');
    imageImg.src = posterPath;
    imageImg.alt = `${name} poster`;
    imageE.append(imageImg);

    const nameE = document.createElement('p');
    nameE.className = 'card__name';
    nameE.textContent = name;
    cardE.dataset.name = name;

    const authorE = document.createElement('p');
    authorE.className = 'card__author';
    authorE.textContent = author;

    const genreE = document.createElement('p');
    genreE.className = 'card__genre';
    genreE.textContent = `Genre: ${genre}`;

    const releaseE = document.createElement('p');
    genreE.className = 'card__release';
    releaseE.textContent = `Released in ${releaseDate}`;
    cardE.dataset.date = releaseDate;

    const orderE = document.createElement('div');
    orderE.className = 'card__order';
    const amountE = document.createElement('p');
    amountE.className = 'card__amount';
    amountE.textContent = `In stock: ${amount} pcs`;
    const cartE = document.createElement('button');
    cartE.className = 'card__cart';
    const cartImg = document.createElement('img');
    cartImg.src = './assets/cart-add.svg';
    cartImg.alt = 'cart';
    cartE.append(cartImg);
    orderE.append(amountE, cartE);

    if (Cart.getInstance().inCartIds.includes(id)) cardE.classList.add('_inCart');

    cardE.append(langE, imageE, nameE, authorE, genreE, releaseE, orderE);

    if (isBestseller) {
      const badgeE = document.createElement('div');
      badgeE.className = 'card__badge';
      const badgeImg = document.createElement('img');
      badgeImg.src = './assets/best-seller.svg';
      badgeImg.alt = 'Bestseller';
      badgeImg.title = 'Bestseller';
      badgeE.append(badgeImg);
      cardE.append(badgeE);
    }
    return cardE;
  }
}
