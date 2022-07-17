import * as noUiSlider from 'nouislider';
import Filter from './Filter';
import sliders from './sliders';

export default class {
  checkboxes: NodeListOf<Element>;

  dateSlider: noUiSlider.target;

  amountSlider: noUiSlider.target;

  searchField: HTMLInputElement;

  searchBtn: HTMLElement;

  constructor() {
    this.checkboxes = document.querySelectorAll('.filter__item input');
    [this.dateSlider, this.amountSlider] = sliders;
    this.searchField = document.querySelector('#search-field') as HTMLInputElement;
    this.searchBtn = document.querySelector('#search-btn') as HTMLElement;
  }

  resetFilters() {
    this.checkboxes.forEach((checkbox) => {
      if ((checkbox as HTMLInputElement).checked) (checkbox as HTMLInputElement).click();
    });
    this.dateSlider.noUiSlider?.reset();
    this.dateSlider.noUiSlider?.set(Filter.defaultSettings.dateFilter);
    this.amountSlider.noUiSlider?.reset();
    this.amountSlider.noUiSlider?.set(Filter.defaultSettings.amountFilter);
    this.searchField.value = '';
    this.searchBtn.click();
  }

  resetSettings() {
    localStorage.clear();
    document.location.reload();
  }
}
