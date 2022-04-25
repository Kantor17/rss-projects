
let createdPets = [];

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

export {createCard, createdPets};
