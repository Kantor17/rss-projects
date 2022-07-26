export default class Sorter {
  catalogElem: HTMLElement;

  currentOption: string;

  buttons: NodeListOf<HTMLElement>;

  constructor(catalogElem: HTMLElement) {
    this.catalogElem = catalogElem;
    this.currentOption = localStorage.getItem('sortOption') || 'nameDesc';
    this.buttons = document.querySelectorAll('.sort__option');
  }

  sort(): void {
    this.buttons.forEach((btn) => {
      if (btn.dataset.option === this.currentOption) {
        btn.classList.add('_active');
      } else {
        btn.classList.remove('_active');
      }
    });

    switch (this.currentOption) {
      case 'nameDesc':
        this.sortElements(this.getName, this.descendingCompare);
        break;
      case 'nameAsc':
        this.sortElements(this.getName, this.ascendingCompare);
        break;
      case 'dateDesc':
        this.sortElements(this.getDate, this.descendingCompare);
        break;
      case 'dateAsc':
        this.sortElements(this.getDate, this.ascendingCompare);
        break;
      default:
        console.error('Unknown sort option');
    }
    localStorage.sortOption = this.currentOption;
  }

  descendingCompare(currValue: string | number, nextValue: string | number) {
    return currValue < nextValue;
  }

  ascendingCompare(currValue: string | number, nextValue: string | number) {
    return currValue > nextValue;
  }

  getName = (idx: number): string => (this.catalogElem.children[idx] as HTMLElement)
    .dataset.name as string;

  getDate = (idx:number): number => +((this.catalogElem.children[idx] as HTMLElement)
    .dataset.date as string);

  sortElements(
    getter: (idx: number) => string | number,
    compareFunc: (currValue: string | number, nextValue: string | number) => boolean,
  ): void {
    for (let i = 0; i < this.catalogElem.children.length - 1; i += 1) {
      for (let j = i + 1; j < this.catalogElem.children.length; j += 1) {
        const currValue = getter(i);
        const nextValue = getter(j);
        if (compareFunc(currValue, nextValue)) {
          const replaced = this.catalogElem.replaceChild(
            this.catalogElem.children[j],
            this.catalogElem.children[i],
          );
          this.catalogElem.children[i].after(replaced);
        }
      }
    }
  }
}
