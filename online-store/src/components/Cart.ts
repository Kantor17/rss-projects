/* eslint-disable no-alert */
export default class Cart {
  incartIds: string[];

  // eslint-disable-next-line no-use-before-define
  private static Instance: Cart;

  counterE: HTMLElement;

  constructor() {
    this.incartIds = localStorage.getItem('incartIds') ? JSON.parse(localStorage.getItem('incartIds') as string) : [];
    this.counterE = document.querySelector('#cart-counter') as HTMLElement;
    this.updateCounter();
  }

  static getInstace() {
    if (!Cart.Instance) Cart.Instance = new Cart();
    return Cart.Instance;
  }

  updateCart(card: HTMLElement) {
    if (card.classList.contains('_incart')) {
      this.incartIds.splice(this.incartIds.indexOf(card.dataset.id as string), 1);
      card.classList.remove('_incart');
    } else if (this.incartIds.length > 19) {
      alert('Sorry, all slots are full');
    } else {
      this.incartIds.push(card.dataset.id as string);
      card.classList.add('_incart');
    }
    this.updateCounter();
    localStorage.setItem('incartIds', JSON.stringify(this.incartIds));
  }

  updateCounter() {
    this.counterE.textContent = this.incartIds.length.toString();
  }
}
