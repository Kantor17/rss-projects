export default class Cart {
  inCartIds: string[];

  private static Instance: Cart;

  counterE: HTMLElement;

  constructor() {
    this.inCartIds = localStorage.getItem('inCartIds') ? JSON.parse(localStorage.getItem('inCartIds') as string) : [];
    this.counterE = document.querySelector('#cart-counter') as HTMLElement;
  }

  static getInstance() {
    if (!Cart.Instance) Cart.Instance = new Cart();
    return Cart.Instance;
  }

  updateCart(card: HTMLElement) {
    if (card.classList.contains('_inCart')) {
      this.inCartIds.splice(this.inCartIds.indexOf(card.dataset.id as string), 1);
      card.classList.remove('_inCart');
    } else if (this.inCartIds.length > 19) {
      alert('Sorry, all slots are full');
    } else {
      this.inCartIds.push(card.dataset.id as string);
      card.classList.add('_inCart');
    }
    this.updateCounter();
    localStorage.setItem('inCartIds', JSON.stringify(this.inCartIds));
  }

  updateCounter() {
    this.counterE.textContent = this.inCartIds.length.toString();
  }
}
