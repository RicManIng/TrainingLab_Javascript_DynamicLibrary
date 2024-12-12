import { loadMenu } from './header.js';
import { loadBookLikes, loadBookTypes, loadBooks, isElementInViewport } from './utils.js';

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

function filterBooksByType(type, books, likes){
    let filteredBooks = books.filter(book => book.tipologia == type);
    createBookCards(filteredBooks, likes, true);
}

function createBookCard(book, likesNumber, position){
    let noMoreReviewsMessage = document.getElementById('noMoreReviewsMessage');
    let div = document.createElement('div');
    div.classList.add('review');
    noMoreReviewsMessage.parentNode.insertBefore(div, noMoreReviewsMessage);
    if(position % 2 === 0){
        div.classList.add('even');
    } else {
        div.classList.add('odd');
    }

    let imgContainer = document.createElement('div');
    imgContainer.classList.add('imgContainer');
    div.appendChild(imgContainer);

    let infoContainer = document.createElement('div');
    infoContainer.classList.add('infoContainer');
    div.appendChild(infoContainer);

    let title = document.createElement('h2');
    title.innerText = book.titolo;
    infoContainer.appendChild(title);

    let author = document.createElement('p');
    author.innerText = 'Author : ' + book.autore;
    infoContainer.appendChild(author);

    let type = document.createElement('p');
    type.innerText = 'Type : ' + book.tipologia;
    infoContainer.appendChild(type);

    let evaluationContainer = document.createElement('div');
    evaluationContainer.classList.add('evaluationContainer');
    infoContainer.appendChild(evaluationContainer);
    let evalText = document.createElement('p');
    evalText.innerText = 'Evaluation : ';
    evaluationContainer.appendChild(evalText);
    for(let i = 0; i < book.valutazione; i++){
        let star = document.createElement('i');
        star.classList.add('fas');
        star.classList.add('fa-star');
        evaluationContainer.appendChild(star);
    }

    let summary = document.createElement('p');
    summary.innerText = 'Description : ' + book.sommario;
    infoContainer.appendChild(summary);

    let a = document.createElement('a');
    a.href = 'reviewDetail.php?id=' + book.id;
    a.innerText = 'Read more';
    infoContainer.appendChild(a);

    let generalInformation = document.createElement('div');
    generalInformation.classList.add('generalInformation');
    infoContainer.appendChild(generalInformation);

    let likesContainer = document.createElement('div');
    likesContainer.classList.add('likesContainer');
    generalInformation.appendChild(likesContainer);
    let likesIcon = document.createElement('i');
    likesIcon.classList.add('fas');
    likesIcon.classList.add('fa-thumbs-up');
    likesContainer.appendChild(likesIcon);
    let likesNumberText = document.createElement('p');
    likesNumberText.innerText = likesNumber;
    likesContainer.appendChild(likesNumberText);

    let user = document.createElement('a');
    user.href = 'userDetail.php?username=' + book.username_creatore;
    user.innerText = book.username_creatore;
    generalInformation.appendChild(user);

    let date = document.createElement('p');
    date.innerText = book.data_creazione;
    generalInformation.appendChild(date);
}

function createBookCards(books, likes, reset = false){
    if(reset){
        let reviews = document.getElementsByClassName('review');
        while(reviews.length > 0){
            reviews[0].remove();
        }
    }

    let reviews = document.getElementsByClassName('review');
    let actualLength = reviews.length;

    for(let i = actualLength; i < actualLength + 10; i++){
        if(i >= books.length){ // Modificato da > a >=
            let noMoreReviewsMessage = document.getElementById('noMoreReviewsMessage');
            noMoreReviewsMessage.innerHTML = 'No more reviews to show';
            let showMore = document.getElementById('loadMore');
            showMore.style.display = 'none';
            break;
        }
        const filteredBook = books[i];
        console.log(filteredBook);
        let id = filteredBook.id;
        const filteredLike = likes.filter(like => like.id == id);
        console.log(filteredLike);
        if(filteredBook && filteredLike.length > 0){
            console.log(books.length, i);
            createBookCard(filteredBook, filteredLike[0].likes.length, i);
        } else {
            createBookCard(filteredBook, 0, i);
        }
    }
}

function handleScroll(oddElements, evenElements) {
    oddElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.style.left = '0';
        } else {
            element.style.left = '-100vw';
        }
    });

    evenElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.style.left = '0';
        } else {
            element.style.left = '100vw';
        }
    });
}

window.onload = async function() {
    await loadMenu();
    let reviewArray = await loadBooks();
    let reviewLikes = await loadBookLikes();
    let bookTypes = await loadBookTypes();

    createSelectOptions(bookTypes);

    let select = document.getElementById('select');
    select.addEventListener('change', adjustSelectStyle);

    createBookCards(reviewArray, reviewLikes);

    let showMore = document.getElementById('loadMore');
    let filterCards = document.getElementById('searchButton');

    showMore.addEventListener('click', function(){
        createBookCards(reviewArray, reviewLikes);
        // Re-select elements after adding new cards
        const oddElements = document.querySelectorAll('.odd');
        const evenElements = document.querySelectorAll('.even');
        handleScroll(oddElements, evenElements);
    });

    filterCards.addEventListener('click', function(){
        let selectedType = select.value;
        filterBooksByType(selectedType, reviewArray, reviewLikes);
        const oddElements = document.querySelectorAll('.odd');
        const evenElements = document.querySelectorAll('.even');
        handleScroll(oddElements, evenElements);
    });

    const oddElements = document.querySelectorAll('.odd');
    const evenElements = document.querySelectorAll('.even');

    handleScroll(oddElements, evenElements);
    window.addEventListener('scroll', function(){
        const oddElements = document.querySelectorAll('.odd');
        const evenElements = document.querySelectorAll('.even');
        handleScroll(oddElements, evenElements);
    });
}