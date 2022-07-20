import Cart from '../src/components/Cart';

describe('Cart', () => {
  const cart = Cart.getInstance();
  cart.counterE = document.createElement('div');
  it('updateCounter method should update textContent of counter element', () => {
    cart.updateCounter();
    expect(cart.counterE.textContent).toBe(cart.inCartIds.length.toString());
  });
  describe('updateCart method', () => {
    const card = document.createElement('div');
    card.dataset.id = '1';
    it('should add card id to inCartIds if card doesn\'t contain active class', () => {
      cart.updateCart(card);
      expect(cart.inCartIds).toContain('1');
    });
    it('should remove card id from inCartIds if card contain active class', () => {
      card.className = '_inCart';
      cart.updateCart(card);
      expect(cart.inCartIds).not.toContain('1');
    });
  });
});
