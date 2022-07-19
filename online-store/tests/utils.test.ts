import { minFrom, maxFrom, createCard } from '../src/components/utils';

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
