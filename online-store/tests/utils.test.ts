import {
  minFrom, maxFrom, convertToNumbers, createCard,
} from '../src/helpers/utils';

const sourceExample = [{
  name: 'a',
  id: '0',
},
{
  name: 'b',
  id: '1',
},
{
  name: 'c',
  id: '2',
},
{
  name: 'd',
  id: '3',
},
{
  name: 'e',
  id: '4',
},
{
  name: 'f',
  id: '5',
}];
describe('minFrom function', () => {
  it('should return minimal numeric value of given property in array of objects', () => {
    expect(minFrom(sourceExample, 'id')).toBe(0);
  });
});
describe('maxFrom function', () => {
  it('should return maximal numeric value of given property in array of objects', () => {
    expect(maxFrom(sourceExample, 'id')).toBe(5);
  });
});

describe('covertToNumbers function', () => {
  test('array of numbers in strings', () => {
    expect(convertToNumbers(['1', '2', '3'])).toEqual([1, 2, 3]);
  });
});

describe('createCard function', () => {
  const bookExample = {
    id: '0',
    name: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'fantasy',
    releaseDate: '1937',
    amount: '9',
    language: 'en',
    isBestseller: true,
    posterPath: 'https://books.google.com/books/content/images/frontcover/U799AY3yfqcC?fife=w240-h480',
  };
  it('should contain dataset with book\'s id, name and date', () => {
    expect(createCard(bookExample).dataset)
      .toMatchObject({ id: bookExample.id, name: bookExample.name, date: bookExample.releaseDate });
  });
  it('should have propper className', () => {
    expect(createCard(bookExample).className).toBe('card');
  });
});
