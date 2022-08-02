export default class {
  createTitle(name: string, count = 0) {
    return this.createElementFromMarkup(`
    <h1 class="title">
      ${name}<span class="total-counter">(${count.toString()})</span>
    </h1>`);
  }

  createPageCounter(count = 0) {
    return this.createElementFromMarkup(`<h2 class="page-counter">Page #${count.toString()}</h2>`);
  }

  createPagination() {
    return this.createElementFromMarkup(`
      <div class="pagination">
        <button class="prev-btn btn-primary">Previous</button>
        <button class="next-btn btn-primary">Next</button>
      </div>`);
  }

  createElement(tagName: string, className: string) {
    const elem = document.createElement(tagName);
    elem.className = className;
    return elem;
  }

  createElementFromMarkup(markup: string) {
    const elem = document.createElement('div');
    elem.innerHTML = markup;
    return elem.children[0];
  }
}
