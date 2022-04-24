import {
    pets
}
from './pets.js';

const BTN_LEFT = document.querySelector('.friends__arrow-left');
const BTN_RIGHT = document.querySelector('.friends__arrow-right');
const SLIDER = document.querySelector('.friends__slider');
let createdPets = [];

let currentAmount = 3;
window.addEventListener('resize', () => {
    if (window.screen.width >= 1280) {
        currentAmount = 3;
    }
    if (window.screen.width < 1280) {
        currentAmount = 2;
    }
    if (window.screen.width < 768) {
        currentAmount = 1;
    }
});

function createCard(source) {
    let pet = source[Math.round(Math.random() * (source.length - 1))];
    while (createdPets.includes(pet)) {
        pet = source[Math.round(Math.random() * (source.length - 1))];
    }
    createdPets.push(pet);
    const card = document.createElement('div');
    card.pet = pet;
    card.classList = 'friends__card card';
    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList = 'card__image img-wrapper';
    const cardImage = document.createElement('img');
    cardImage.classList = 'img';
    cardImage.alt = pet.type + ' ' + pet.breed;
    cardImage.src = pet.img;
    cardImageWrapper.append(cardImage);
    card.append(cardImageWrapper);
    const cardName = document.createElement('h3');
    cardName.classList = 'card__name heading';
    cardName.textContent = pet.name;
    card.append(cardName);
    const cardButton = document.createElement('a');
    cardButton.classList = 'card__button button _small';
    cardButton.textContent = 'Learn more';
    card.append(cardButton);

    card.addEventListener('click', () => {
        showPopup(card);

        const CLOSE_BTN = document.querySelector('.popup__button');
        CLOSE_BTN.addEventListener('click', () => {
            closePopup();
        });

        const OVERLAY = document.querySelector('.popup-overlay');
        OVERLAY.addEventListener('click', (event) => {
            if (!event.target.closest('.popup')) {
                closePopup()
            }
        });

        OVERLAY.addEventListener('mouseover', (event) => {
            if (!event.target.closest('.popup')) {
                CLOSE_BTN.classList.add('hover');
            }
        });

        OVERLAY.addEventListener('mouseout', (event) => {
            if (!event.target.closest('.popup')) {
                CLOSE_BTN.classList.remove('hover');
            }
        });
    })
    return card;
}

function createCardsWrapper(amount) {
    const cardsWrapper = document.createElement('div');
    cardsWrapper.classList = 'friends__cards-wrapper cards-wrapper'
    const currentCards = document.createElement('div');
    currentCards.classList = 'friends__cards cards friends__current-cards';
    const previousCards = document.createElement('div');
    previousCards.classList = 'friends__cards cards friends__previous-cards';
    const nextCards = document.createElement('div');
    nextCards.classList = 'friends__cards cards friends__next-cards';
    for (let i = 0; i < amount; i++) {
        currentCards.append(createCard(pets));
    }
    cardsWrapper.append(previousCards, currentCards, nextCards);
    return cardsWrapper;
}

function createNextCards(amount) {
    const cards = document.createElement('div');
    for (let i = 0; i < amount; i++) {
        const card = createCard(pets);
        cards.append(card);
    }
    createdPets.splice(0, amount);
    return cards;
}

SLIDER.prepend(createCardsWrapper(currentAmount));

BTN_LEFT.addEventListener('click', () => {
    const nextCards = document.querySelector('.friends__next-cards');
    const createdNext = createNextCards(currentAmount);
    createdNext.classList = 'friends__cards cards friends__next-cards';
    nextCards.replaceWith(createdNext);
    document.querySelector('.friends__current-cards').classList.add('move-left');
    createdNext.classList.add('move-left');
    BTN_LEFT.disabled = true;
    BTN_RIGHT.disabled = true;
});

BTN_RIGHT.addEventListener('click', () => {
    const previousCards = document.querySelector('.friends__previous-cards');
    const createdPrevious = createNextCards(currentAmount);
    createdPrevious.classList = 'friends__cards cards friends__previous-cards';
    previousCards.replaceWith(createdPrevious);
    document.querySelector('.friends__current-cards').classList.add('move-right');
    createdPrevious.classList.add('move-right');
    BTN_LEFT.disabled = true;
    BTN_RIGHT.disabled = true;
});

SLIDER.addEventListener('animationend', (e) => {
    BTN_LEFT.disabled = false;
    BTN_RIGHT.disabled = false;
    e.target.classList.remove('move-left');
    e.target.classList.remove('move-right');
    if (e.target.classList.contains('friends__next-cards')) {
        document.querySelector('.friends__current-cards').replaceChildren(...document.querySelector('.friends__next-cards').children);
    }
    if (e.target.classList.contains('friends__previous-cards')) {
        document.querySelector('.friends__current-cards').replaceChildren(...document.querySelector('.friends__previous-cards').children);
    }
});

function showPopup(card) {
    const popupOverlay = document.createElement('div');
    popupOverlay.classList.add('popup-overlay');
    const popupWrapper = document.createElement('div');
    popupWrapper.classList.add('popup-wrapper');
    const pet = card.pet;
    popupWrapper.innerHTML = `
    <button class="popup__button button _round"></button>
    <div class="popup">
        <div class="popup__image img-wrapper">
            <img src="${pet.img}" alt="${pet.breed} ${pet.type}" class="img">
        </div>
        <div class="popup__content">
            <h3 class="popup__name heading">${pet.name}</h3>
            <p class="popup__type">${pet.type} - ${pet.breed}</p>
            <p class="popup__description">${pet.description}</p>
            <ul class="popup__list">
                <li class="popup__item">
                    <h4 class="popup__item-heading">Age</h4>
                    :
                    ${pet.age}
                </li>
                <li class="popup__item">
                    <h4 class="popup__item-heading">Inoculations</h4>
                    :
                    ${pet.inoculations.join(', ')}
                </li>
                <li class="popup__item">
                    <h4 class="popup__item-heading">Diseas</h4>
                    :
                    ${pet.diseases.join(', ')}
                </li>
                <li class="popup__item">
                    <h4 class="popup__item-heading">Parasites</h4>
                    :
                    ${pet.parasites.join(', ')}
                </li>
            </ul>
        </div>
    </div>`;

    popupOverlay.append(popupWrapper);
    document.querySelector('.main').append(popupOverlay);
    document.documentElement.classList.add('_disable-scroll');
};

function closePopup() {
    document.documentElement.classList.remove('_disable-scroll');
    document.querySelector('.popup-overlay').remove();
}