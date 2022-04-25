const BURGER_BTN = document.querySelector('.header__burger');
const BURGER_MENU = document.querySelector('.header__burger-menu');
const NAVBAR = document.querySelector('.header__navbar');
const OVERLAY = document.querySelector('.header__burger-overlay');

BURGER_BTN.addEventListener('click', () => {
    BURGER_BTN.classList.toggle('open');
    BURGER_MENU.classList.toggle('open');
    OVERLAY.classList.toggle('open');
    NAVBAR.classList.toggle('_hidden');
    document.documentElement.classList.toggle('_disable-scroll');
});

function closeMenu() {
    BURGER_MENU.classList.remove('open');
    BURGER_BTN.classList.remove('open');
    OVERLAY.classList.remove('open');
    NAVBAR.classList.remove('_hidden');
    document.documentElement.classList.remove('_disable-scroll');
}

BURGER_MENU.addEventListener('click', (event) => {
    if (event.target.classList.contains('header__link')) {
        closeMenu();
    }
});

OVERLAY.addEventListener('click', () => {
    closeMenu();
});