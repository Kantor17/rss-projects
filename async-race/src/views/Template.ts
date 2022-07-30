export default class {
  createTitle(name: string, count = 0) {
    const title = document.createElement('h1');
    title.innerHTML = `
    <h1 class="title">
      ${name}<span class="total-counter">(${count.toString()})</span>
    </h1>`;
    return title.children[0];
  }

  createPageCounter(count = 0) {
    const pageCounter = document.createElement('h2');
    pageCounter.innerHTML = `<h2 class="page-counter">Page #${count.toString()}</h2>`;
    return pageCounter.children[0];
  }
}
