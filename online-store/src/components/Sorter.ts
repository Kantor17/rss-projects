export default class Sorter {
  catalog: HTMLElement;

  constructor() {
    this.catalog = document.querySelector('#catalog') as HTMLElement;
  }

  nameDescending(): void {
    for (let i = 0; i < this.catalog.children.length - 1; i += 1) {
      for (let j = i + 1; j < this.catalog.children.length; j += 1) {
        const currValue: string | number = (this.catalog.children[i]
          .querySelector('.card__name') as HTMLElement)
          .textContent as string;
        const nextValue: string = (this.catalog.children[j]
          .querySelector('.card__name') as HTMLElement)
          .textContent as string;
        if (currValue < nextValue) {
          const replaced = this.catalog.replaceChild(
            this.catalog.children[j],
            this.catalog.children[i],
          );
          this.catalog.children[i].after(replaced);
        }
      }
    }
  }

  nameAscending(): void {
    for (let i = 0; i < this.catalog.children.length - 1; i += 1) {
      for (let j = i + 1; j < this.catalog.children.length; j += 1) {
        const currValue: string | number = (this.catalog.children[i]
          .querySelector('.card__name') as HTMLElement)
          .textContent as string;
        const nextValue: string = (this.catalog.children[j]
          .querySelector('.card__name') as HTMLElement)
          .textContent as string;
        if (currValue > nextValue) {
          const replaced = this.catalog.replaceChild(
            this.catalog.children[j],
            this.catalog.children[i],
          );
          this.catalog.children[i].after(replaced);
        }
      }
    }
  }

  dateDescending(): void {
    for (let i = 0; i < this.catalog.children.length - 1; i += 1) {
      for (let j = i + 1; j < this.catalog.children.length; j += 1) {
        const currValue = Number((this.catalog.children[i] as HTMLElement).dataset.date);
        const nextValue = Number((this.catalog.children[j] as HTMLElement).dataset.date);
        if (currValue < nextValue) {
          const replaced = this.catalog.replaceChild(
            this.catalog.children[j],
            this.catalog.children[i],
          );
          this.catalog.children[i].after(replaced);
        }
      }
    }
  }

  dateAscending(): void {
    for (let i = 0; i < this.catalog.children.length - 1; i += 1) {
      for (let j = i + 1; j < this.catalog.children.length; j += 1) {
        const currValue = Number((this.catalog.children[i] as HTMLElement).dataset.date);
        const nextValue = Number((this.catalog.children[j] as HTMLElement).dataset.date);
        if (currValue > nextValue) {
          const replaced = this.catalog.replaceChild(
            this.catalog.children[j],
            this.catalog.children[i],
          );
          this.catalog.children[i].after(replaced);
        }
      }
    }
  }
}
