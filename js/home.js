import { loadMenu } from './header.js';
import { loadBookLikes, loadBookTypes, loadBooks } from './utils.js';

function createSelectOptions(bookTypes) {
    let select = document.getElementById('select');
    bookTypes.forEach(bookType => {
        let option = document.createElement('option');
        option.value = bookType.name;
        option.innerText = bookType.name;
        option.classList.add('selection');
        select.appendChild(option);
    });
}

function adjustSelectStyle(event){
    let select = event.target;
    let value = select.value;
    if (value != ''){
        select.classList.add('selected');
    } else {
        select.classList.remove('selected');
    }
}

function filterBooksByType(type){
    /* to implement */
}

function createBookCard(book, likesNumber){
    /* to implement */
}

function createBookCards(books, likes){
    /* to implement */
}

window.onload = async function() {
    await loadMenu();
    let reviewArray = await loadBooks();
    let reviewLikes = await loadBookLikes();
    let bookTypes = await loadBookTypes();

    createSelectOptions(bookTypes);

    let select = document.getElementById('select');
    select.addEventListener('change', adjustSelectStyle);
}