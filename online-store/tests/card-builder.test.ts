import CardBuilder from '../src/components/CardBuilder';

describe('Card builder build function', () => {
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
  const buildCard = new CardBuilder().build;
  it('should contain dataset with book\'s id, name and date', () => {
    expect(buildCard(bookExample).dataset)
      .toMatchObject({ id: bookExample.id, name: bookExample.name, date: bookExample.releaseDate });
  });
  it('should have propper className', () => {
    expect(buildCard(bookExample).className).toBe('card');
  });
});
