import{
    createCard,
    createdPets,
} from './cards.js';
import {
    pets
}
from './pets.js';

const BTN_LEFT = document.querySelector('.friends__arrow-left');
const BTN_RIGHT = document.querySelector('.friends__arrow-right');
const SLIDER = document.querySelector('.friends__slider');

let currentAmount;
if (window.screen.width >= 1280) {
    currentAmount = 3;
}
if (window.screen.width < 1280) {
    currentAmount = 2;
}
if (window.screen.width < 768) {
    currentAmount = 1;
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

SLIDER.prepend(createCardsWrapper(currentAmount));

function createNextCards(amount) {
    const cards = document.createElement('div');
    for (let i = 0; i < amount; i++) {
        const card = createCard(pets);
        cards.append(card);
    }
    createdPets.splice(0, amount);
    return cards;
}

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
