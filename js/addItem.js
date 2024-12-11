import { loadMenu } from './header.js';
import { loadBookTypes } from './utils.js';

let activeStarCount = 0;

function createSelectOptions(bookTypes) {
    let select = document.getElementById('book-type');
    bookTypes.forEach(bookType => {
        let option = document.createElement('option');
        option.value = bookType.name;
        option.innerText = bookType.name;
        option.classList.add('select');
        select.appendChild(option);
    });
}

function adjustSelectStyle(event){
    let select = event.target;
    let value = select.value;
    if (value != ''){
        select.classList.add('selection');
    } else {
        select.classList.remove('selection');
    }
}

function starStaticEffect(number){
    if(activeStarCount > 0){
        activeStarCount--;
        return; // Esci dalla funzione se c'è un hover attivo
    }

    let stars = document.getElementsByClassName('fa-star');
    let rating = document.getElementById('book-rating').value;

    for (let star of stars) {
        let parts = star.id.split('-');
        let starNumber = parseInt(parts[1], 10);
        star.classList.remove('hovered', 'colored');
        if(starNumber <= rating){
            star.classList.add('colored');
        }
    }
}

function starHoverEffect(event){
    activeStarCount++;
    console.log(activeStarCount);
    let stars = document.getElementsByClassName('fa-star');
    let parts = event.target.id.split('-');
    let refNumber = parseInt(parts[1], 10);
    for (let star of stars){
        let parts = star.id.split('-');
        let number = parseInt(parts[1], 10);
        star.classList.remove('hovered');
        star.classList.remove('colored');
        if(number < refNumber){
            star.classList.add('colored');
            star.classList.remove('hovered');
        } else if (number == refNumber) {
            star.classList.add('hovered');
            star.classList.remove('colored');
        } else {
            star.classList.remove('colored');
        }
    }
}

function checkForm(){
    /* to implement */
}

window.onload = async function() {
    await loadMenu();

    let bookTypes = await loadBookTypes();

    createSelectOptions(bookTypes);

    let select = document.getElementById('book-type');
    select.addEventListener('change', adjustSelectStyle);

    let stars = document.getElementsByClassName('fa-star');
    for (let star of stars){
        star.addEventListener('mouseover', starHoverEffect);
        star.addEventListener('mouseout', starStaticEffect);
        star.addEventListener('click', event => {
            let starId = event.target.id;
            let parts = starId.split('-');
            let newRating = parseInt(parts[1], 10);
            let bookRating = document.getElementById('book-rating');
            bookRating.value = newRating;
        });
    }
}
