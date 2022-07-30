import Template from './Template';

export default class extends Template {
  createView() {
    const view = document.createElement('div');
    view.append(this.createTitle('Winners'), this.createPageCounter());
    return view;
  }
}
