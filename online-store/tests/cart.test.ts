import Cart from '../src/components/Cart';

describe('Cart', () => {
  const cart = Cart.getInstance();
  cart.counterE = document.createElement('div');
  it('updateCounter method should update textContent of counter element', () => {
    cart.updateCounter();
    expect(cart.counterE.textContent).toBe(cart.incartIds.length.toString());
  });
  describe('updateCart method', () => {
    const card = document.createElement('div');
    card.dataset.id = '1';
    it('should add card id to incartIds if card doesn\'t contain active class', () => {
      cart.updateCart(card);
      expect(cart.incartIds).toContain('1');
    });
    it('should remove card id from incartIds if card contain active class', () => {
      card.className = '_incart';
      cart.updateCart(card);
      expect(cart.incartIds).not.toContain('1');
    });
  });
});
