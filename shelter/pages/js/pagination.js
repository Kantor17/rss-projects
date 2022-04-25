import {
    createCard,
    createdPets
} from '../js/cards.js'

import {
    pets
} from '../js/pets.js'

const wrapper = document.querySelector('.full-friends__cards-wrapper');

const myPets = [];
for (let i = 0; i < 6; i++) {
    pets.forEach(item => {
        myPets.push(item);
    })
}

let cardsPerPage;
if (window.screen.width >= 1280) {
    cardsPerPage = 8;
}
if (window.screen.width < 1280) {
    cardsPerPage = 6;
}
if (window.screen.width < 768) {
    cardsPerPage = 3;
}
const pagesAmount = myPets.length / cardsPerPage;
let currentPage = 0;

function createPages() {
    const pages = [];
    for (let i = 0; i < pagesAmount; i++) {
        const page = document.createElement('div');
        page.classList = 'full-friends__page cards';
        const pagePets = myPets.splice(0, cardsPerPage);
        for (let j = 0; j < cardsPerPage; j++) {
            const card = createCard(pagePets);
            page.append(card);
        }
        createdPets.length = 0;
        pages.push(page);
    }
    return pages;
}

const pages = createPages();

function changePage(pages, number) {
    wrapper.replaceChildren(pages[number]);
};

changePage(pages, currentPage);

const controls = document.querySelector('.full-friends__controls');
const backButtons = document.querySelectorAll('.full-friends__previous-button, .full-friends__first-button');
const forwardButtons = document.querySelectorAll('.full-friends__next-button, .full-friends__last-button');
const numberButton = document.querySelector('.full-friends__pagenum');

controls.addEventListener('click', (event) => {
    const target = event.target;
    if (!target.classList.contains('_disabled')) {
        if (target.classList.contains('full-friends__next-button')) {
            changePage(pages, ++currentPage);
        }

        if (target.classList.contains('full-friends__previous-button')) {
            changePage(pages, --currentPage);
        }

        if (target.classList.contains('full-friends__first-button')) {
            currentPage = 0;
            changePage(pages, currentPage);
        }

        if (target.classList.contains('full-friends__last-button')) {
            currentPage = pagesAmount - 1;
            changePage(pages, currentPage);
        }
    }
    numberButton.textContent = currentPage + 1;

    if (currentPage >= 1) {
        backButtons.forEach(item => {
            item.classList.remove('_disabled');
        });
    } else {
        backButtons.forEach(item => {
            item.classList.add('_disabled');
        });
    }

    if (currentPage + 1 >= pagesAmount) {
        forwardButtons.forEach(item => {
            item.classList.add('_disabled');
        });
    } else {
        forwardButtons.forEach(item => {
            item.classList.remove('_disabled');
        });
    }
});