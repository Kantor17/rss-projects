import Sorter from '../src/components/Sorter';

describe('Sorter', () => {
  const card1 = document.createElement('div');
  card1.dataset.name = 'd';
  card1.dataset.year = '3';
  const card2 = document.createElement('div');
  card2.dataset.name = 'b';
  card2.dataset.year = '4';
  const card3 = document.createElement('div');
  card3.dataset.name = 'c';
  card3.dataset.year = '1';
  const card4 = document.createElement('div');
  card4.dataset.name = 'a';
  card4.dataset.year = '2';

  const parent = document.createElement('div');
  parent.append(card1, card2, card3, card4);
  const sorter = new Sorter(parent);

  it('should sort by name descending', () => {
    const resultingHTML = '<div data-name="d" data-year="3"></div><div data-name="c" data-year="1"></div><div data-name="b" data-year="4"></div><div data-name="a" data-year="2"></div>';
    sorter.nameDescending();
    expect(sorter.catalogElem.innerHTML).toBe(resultingHTML);
  });
  it('should sort by name ascending', () => {
    const resultingHTML = '<div data-name="a" data-year="2"></div><div data-name="b" data-year="4"></div><div data-name="c" data-year="1"></div><div data-name="d" data-year="3"></div>';
    sorter.nameAscending();
    expect(sorter.catalogElem.innerHTML).toBe(resultingHTML);
  });
  it('should sort by release date descending', () => {
    const resultingHTML = '<div data-name="a" data-year="2"></div><div data-name="b" data-year="4"></div><div data-name="c" data-year="1"></div><div data-name="d" data-year="3"></div>';
    sorter.dateDescending();
    expect(sorter.catalogElem.innerHTML).toBe(resultingHTML);
  });
  it('should sort by release date ascending', () => {
    const resultingHTML = '<div data-name="a" data-year="2"></div><div data-name="b" data-year="4"></div><div data-name="c" data-year="1"></div><div data-name="d" data-year="3"></div>';
    sorter.dateAscending();
    expect(sorter.catalogElem.innerHTML).toBe(resultingHTML);
  });
});
