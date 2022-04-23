import {
    pets
} from './pets.js';

const BTN_LEFT = document.querySelector('.friends__arrow-left');
const BTN_RIGHT = document.querySelector('.friends__arrow-right');
const SLIDER = document.querySelector('.friends__slider');
let createdPets = [];

let currentAmount = 3;
if(window.screen.width < 1280) {
    currentAmount = 2;
}
if(window.screen.width < 768) {
    currentAmount = 1;
}

function createCardsWrapper(pets, amount) {
    const cardsWrapper = document.createElement('div');
    cardsWrapper.classList = 'friends__cards-wrapper cards-wrapper'
    const currentCards = document.createElement('div');
    currentCards.classList = 'friends__cards cards friends__current-cards';
    const previousCards = document.createElement('div');
    previousCards.classList = 'friends__cards cards friends__previous-cards';
    const nextCards = document.createElement('div');
    nextCards.classList = 'friends__cards cards friends__next-cards';
    for (let i = 0; i < amount; i++) {

        let pet = pets[Math.round(Math.random() * (pets.length - 1))];
        while (createdPets.includes(pet)) {
            pet = pets[Math.round(Math.random() * (pets.length - 1))];
        }
        createdPets.push(pet);
        const card = document.createElement('div');
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
        currentCards.append(card);
    }
    cardsWrapper.append(previousCards, currentCards, nextCards);
    return cardsWrapper;
}

function createNextCards(pets, amount) {
    const cards = document.createElement('div');
    for (let i = 0; i < amount; i++) {
        let pet = pets[Math.round(Math.random() * (pets.length - 1))];
        while (createdPets.includes(pet)) {
            pet = pets[Math.round(Math.random() * (pets.length - 1))];
        }
        createdPets.push(pet);
        const card = document.createElement('div');
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
        cards.append(card);
    }
    createdPets.splice(0, amount);
    console.log(createdPets);
    return cards.innerHTML;
}

SLIDER.prepend(createCardsWrapper(pets, currentAmount));

BTN_LEFT.addEventListener('click', () => {
    const nextCards = document.querySelector('.friends__next-cards');
    nextCards.innerHTML = createNextCards(pets, currentAmount);
    document.querySelector('.friends__current-cards').classList.add('move-left');
    nextCards.classList.add('move-left');
    BTN_LEFT.disabled = true;
    BTN_RIGHT.disabled = true;
});

BTN_RIGHT.addEventListener('click', () => {
    const previousCards = document.querySelector('.friends__previous-cards');
    previousCards.innerHTML = createNextCards(pets, currentAmount);
    document.querySelector('.friends__current-cards').classList.add('move-right');
    previousCards.classList.add('move-right');
    BTN_LEFT.disabled = true;
    BTN_RIGHT.disabled = true;
});

SLIDER.addEventListener('animationend', (e) => {
    BTN_LEFT.disabled = false;
    BTN_RIGHT.disabled = false;
    e.target.classList.remove('move-left');
    e.target.classList.remove('move-right');
    if (e.target.classList.contains('friends__next-cards')) {
        document.querySelector('.friends__current-cards').innerHTML = document.querySelector('.friends__next-cards').innerHTML;
    }
    if (e.target.classList.contains('friends__previous-cards')) {
        document.querySelector('.friends__current-cards').innerHTML = document.querySelector('.friends__previous-cards').innerHTML;
    }
})