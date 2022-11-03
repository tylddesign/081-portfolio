
// Вариант с getElementsByClassName
// const hamburger = document.getElementsByClassName('hamburger'),
//     menu = document.getElementsByClassName('menu'),
//     closeElem = document.getElementsByClassName('menu__close');

// console.log(hamburger.length);
// console.log(menu.length);


// hamburger[0].onclick = function () {
//     menu[0].classList.add('active');
// }

// Вариант с querySelector
const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    closeElem = document.querySelector('.menu__close');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

hamburger.onclick = function () {
    menu.classList.add('active');
}

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});

const counters = document.querySelectorAll('.skills__rating-counter'),
    lines = document.querySelectorAll('.skills__rating-line span');

counters.forEach((item, i) => {
    lines[i].style.width = item.innerHTML;
})