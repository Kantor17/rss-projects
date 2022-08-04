export default class {
  createTitle(name: string) {
    return this.createElementFromMarkup(`
    <h1 class="title">
      ${name}(<span class="total-counter">0</span>)
    </h1>`);
  }

  createPageCounter() {
    return this.createElementFromMarkup('<h2 class="page-counter">Page #<span class="page-num">1</span></h2>');
  }

  createPagination() {
    return this.createElementFromMarkup(`
      <div class="pagination">
        <button class="prev-btn btn-primary">Previous</button>
        <button class="next-btn btn-primary">Next</button>
      </div>`);
  }

  createElement(tagName: string, className: string, textContent = '') {
    const elem = document.createElement(tagName);
    elem.className = className;
    elem.textContent = textContent;
    return elem;
  }

  createElementFromMarkup(markup: string) {
    const elem = document.createElement('div');
    elem.innerHTML = markup;
    return elem.children[0];
  }
}
