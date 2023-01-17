import { BookType } from '../helpers/types';
import Cart from './Cart';

export default class {
  build(book: BookType): HTMLElement {
    const {
      id, name, author, genre, releaseDate, amount,
      language, isBestseller, posterPath,
    } = book;

    const html = `
    <div class="card ${Cart.getInstance().inCartIds.includes(id) ? '_inCart' : ''}"
      data-id="${id}" data-name="${name}"
      data-date="${releaseDate}">
      <div class="card__language">
        <img src="${language === 'ua' ? './assets/ukraine-icon.svg' : './assets/english-icon.svg'}"
          alt="${language}"
          title="${language}"
        >
      </div>
      <div class="card__image">
        <img src="${posterPath}" alt="${name} poster">
      </div>
      <p class="card__name">${name}</p>
      <p class="card__author">${author}</p>
      <p class="card__genre">Genre: ${genre}</p>
      <p class="card__release">Released in ${releaseDate}</p>
      <div class="card__order">
        <p class="card__amount">In stock: ${amount} pcs</p>
        <button class="card__cart">
          <img src="./assets/cart-add.svg" alt="cart">
        </button>
      </div>
      ${isBestseller ? `
      <div class="card__badge">
        <img src="./assets/best-seller.svg" alt="Bestseller" title="Bestseller">
      </div>` : ''}
    </div>`;
    const card = document.createElement('div');
    card.innerHTML = html;
    return card.children[0] as HTMLElement;
  }
}
