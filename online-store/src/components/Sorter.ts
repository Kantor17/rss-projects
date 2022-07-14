export default class Sorter {
  catalogElem: HTMLElement;

  currentOption: string;

  constructor(catalogElem: HTMLElement) {
    this.catalogElem = catalogElem;
    this.currentOption = 'nameAsc';
  }

  sort(): void {
    switch (this.currentOption) {
      case 'nameDesc':
        this.nameDescending();
        break;
      case 'nameAsc':
        this.nameAscending();
        break;
      case 'dateDesc':
        this.dateDescending();
        break;
      case 'dateAsc':
        this.dateAscending();
        break;
      default:
        console.error('Unknow sort option');
    }
  }

  nameDescending(): void {
    for (let i = 0; i < this.catalogElem.children.length - 1; i += 1) {
      for (let j = i + 1; j < this.catalogElem.children.length; j += 1) {
        const currValue: string | number = (this.catalogElem.children[i]
          .querySelector('.card__name') as HTMLElement)
          .textContent as string;
        const nextValue: string = (this.catalogElem.children[j]
          .querySelector('.card__name') as HTMLElement)
          .textContent as string;
        if (currValue < nextValue) {
          const replaced = this.catalogElem.replaceChild(
            this.catalogElem.children[j],
            this.catalogElem.children[i],
          );
          this.catalogElem.children[i].after(replaced);
        }
      }
    }
  }

  nameAscending(): void {
    for (let i = 0; i < this.catalogElem.children.length - 1; i += 1) {
      for (let j = i + 1; j < this.catalogElem.children.length; j += 1) {
        const currValue: string | number = (this.catalogElem.children[i]
          .querySelector('.card__name') as HTMLElement)
          .textContent as string;
        const nextValue: string = (this.catalogElem.children[j]
          .querySelector('.card__name') as HTMLElement)
          .textContent as string;
        if (currValue > nextValue) {
          const replaced = this.catalogElem.replaceChild(
            this.catalogElem.children[j],
            this.catalogElem.children[i],
          );
          this.catalogElem.children[i].after(replaced);
        }
      }
    }
  }

  dateDescending(): void {
    for (let i = 0; i < this.catalogElem.children.length - 1; i += 1) {
      for (let j = i + 1; j < this.catalogElem.children.length; j += 1) {
        const currValue = Number((this.catalogElem.children[i] as HTMLElement).dataset.date);
        const nextValue = Number((this.catalogElem.children[j] as HTMLElement).dataset.date);
        if (currValue < nextValue) {
          const replaced = this.catalogElem.replaceChild(
            this.catalogElem.children[j],
            this.catalogElem.children[i],
          );
          this.catalogElem.children[i].after(replaced);
        }
      }
    }
  }

  dateAscending(): void {
    for (let i = 0; i < this.catalogElem.children.length - 1; i += 1) {
      for (let j = i + 1; j < this.catalogElem.children.length; j += 1) {
        const currValue = Number((this.catalogElem.children[i] as HTMLElement).dataset.date);
        const nextValue = Number((this.catalogElem.children[j] as HTMLElement).dataset.date);
        if (currValue > nextValue) {
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
