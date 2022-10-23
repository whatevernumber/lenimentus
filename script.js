import {randomize} from "./math.js";

/* Hue Rotating Effects */
const root = document.documentElement;
root.style.setProperty('--rotate', `${randomize(348, -348)}deg`);

const nav = document.querySelector('.leni-nav');
const leni_back = document.querySelector('.leni-wrapper');
const rotate_hue_360 = (element) =>
        setInterval(() =>
            element.style.filter =
                `hue-rotate(${randomize(-360, 360)}deg)`,
            1500);
rotate_hue_360(nav);
rotate_hue_360(leni_back);

/* Book Animation */

const book = document.querySelector('.book');
const cover = book.querySelector('.leni-cover');
const image = document.querySelector('.image-block');

const hideOnAnimationEnd = () => {
    image.style.display = 'none';
    cover.style.visibility = 'visible';
    book.classList.remove('book-animate');
    image.removeEventListener('animationend', hideOnAnimationEnd);
    document.removeEventListener('mousemove', autoplay);
}

image.addEventListener('animationend', hideOnAnimationEnd);

const runAnimationOnClick = () => {
    image.style.animationPlayState = 'running';
    book.style.animationPlayState = 'running';
    image.removeEventListener('click', runAnimationOnClick);
};

image.addEventListener('click', runAnimationOnClick);

/* Automatic Book Animation If User Is Inactive for 5s */

const autoplay = () => {
    setTimeout(() => {
        runAnimationOnClick()
    }, 5500);
}
document.addEventListener('mousemove', autoplay);

/* Nav Buttons Interactions */

const nav_buttons = document.querySelectorAll('.nav-item');
const book_info = book;
const author_info = document.querySelector('.author-info');
nav_buttons.forEach((button) => {
    const toggle_blocks = (evt) => {
        if (evt.target.classList.contains('about-book') && !author_info.classList.contains('hidden')) {
            if (cover.style.visibility !== 'visible') {
                cover.style.visibility = 'visible';
                book_info.classList.remove('book-animate');
            }
            author_info.classList.add('hidden');
            book_info.classList.remove('hidden');
        } else if (evt.target.classList.contains('about-author') && !book_info.classList.contains('hidden')) {
            if (image.style.display !== 'none') {
                image.style.display = 'none';
            }
            book_info.classList.add('hidden');
            author_info.classList.remove('hidden');
        }
    }

    button.addEventListener('click', toggle_blocks);
})

/* Debugging */

/* Attempts at On-Scroll Animation */
// image.style.animationPlayState = 'paused';
// book.style.animationPlayState = 'paused';
//
// document.addEventListener('scroll', function (evt) {
//     evt.preventDefault();
//     let scroll_start = 0;
//     let scroll_now = scrollY;
//     if (scroll_now > scroll_start) {
//         scroll_start = scroll_now;
//         // console.log(scroll_start);
//         image.style.animationPlayState = 'running';
//         book.style.animationPlayState = 'running';
//     } else {
//         console.log(scroll_start);
//         image.style.animationPlayState = 'paused';
//         book.style.animationPlayState = 'paused';
//     }
// })
