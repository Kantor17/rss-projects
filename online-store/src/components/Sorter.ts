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
        console.error('Unknown sort option');
    }
    localStorage.sortOption = this.currentOption;
  }

  nameDescending(): void {
    for (let i = 0; i < this.catalogElem.children.length - 1; i += 1) {
      for (let j = i + 1; j < this.catalogElem.children.length; j += 1) {
        const currValue = (this.catalogElem.children[i] as HTMLElement).dataset.name as string;
        const nextValue = (this.catalogElem.children[j] as HTMLElement).dataset.name as string;
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
        const currValue = (this.catalogElem.children[i] as HTMLElement).dataset.name as string;
        const nextValue = (this.catalogElem.children[j] as HTMLElement).dataset.name as string;
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
