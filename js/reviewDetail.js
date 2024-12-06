import { loadMenu } from './header.js';
import { queryString, loadBooks, loadBookComments, loadBookLikes } from './utils.js';

function createPopUpLikes(likes){
    let blurOverlay = document.createElement('div');
    blurOverlay.classList.add('blurOverlay');
    blurOverlay.style.position = 'fixed';
    blurOverlay.style.top = '0';
    blurOverlay.style.left = '0';
    blurOverlay.style.width = '100vw';
    blurOverlay.style.height = '100vh';
    blurOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    document.body.appendChild(blurOverlay);

    let likesScrollView = document.createElement('div');
    likesScrollView.classList.add('likesScrollView');
    blurOverlay.appendChild(likesScrollView);

    let closeWindow = document.createElement('button');
    closeWindow.classList.add('closeWindow');
    closeWindow.addEventListener('click', function(){
        blurOverlay.remove();
    });
    likesScrollView.appendChild(closeWindow);

    let closeIcon = document.createElement('i');
    closeIcon.classList.add('fas');
    closeIcon.classList.add('fa-times');
    closeIcon.classList.add('fa-2x');
    closeWindow.appendChild(closeIcon);

    likes.forEach(like => {
        let likeCard = document.createElement('div');
        likeCard.classList.add('likeCard');
        likesScrollView.appendChild(likeCard);

        let userIcon = document.createElement('i');
        userIcon.classList.add('fas');
        userIcon.classList.add('fa-user');
        userIcon.classList.add('fa-2x');
        likeCard.appendChild(userIcon);

        let user = document.createElement('a');
        user.href = 'userDetail.php?username=' + like;
        user.innerText = like;
        likeCard.appendChild(user);
    });
}

function showComments(comments){
    /* to implement */
}

function buildPage(book, bookLikeNumber, bookCommentsNumber, bookComments, bookLikes){
    
    let main = document.querySelector('main');
    let infoPage = document.createElement('div');
    infoPage.classList.add('infoPage');
    main.appendChild(infoPage);
    let imgContainer = document.createElement('div');
    imgContainer.classList.add('imgContainer');
    imgContainer.style.backgroundImage = 'url(' + book.link + ')';
    imgContainer.style.backgroundSize = 'cover';
    imgContainer.style.backgroundPosition = 'center';
    imgContainer.style.backgroundRepeat = 'no-repeat';
    infoPage.appendChild(imgContainer);

    let infoContainer = document.createElement('div');
    infoContainer.classList.add('infoContainer');
    infoPage.appendChild(infoContainer);

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

    let reviewContainer = document.createElement('div');
    reviewContainer.classList.add('reviewContainer');
    let reviewTitle = document.createElement('h3');
    reviewTitle.innerText = 'Review';
    reviewContainer.appendChild(reviewTitle);
    let reviewText = document.createElement('p');
    reviewText.innerText = book.recensione;
    reviewContainer.appendChild(reviewText);
    main.appendChild(reviewContainer);

    let generalInformation = document.createElement('div');
    generalInformation.classList.add('generalInformation');
    main.appendChild(generalInformation);

    let likesContainer = document.createElement('div');
    likesContainer.classList.add('likesContainer');
    generalInformation.appendChild(likesContainer);

    let likesIconContainer = document.createElement('button');
    likesContainer.title = 'View Likes';
    likesContainer.addEventListener('click', function(){
        createPopUpLikes(bookLikes);
    });
    likesContainer.appendChild(likesIconContainer);

    let likesIcon = document.createElement('i');
    likesIcon.classList.add('fas');
    likesIcon.classList.add('fa-thumbs-up');
    likesIconContainer.appendChild(likesIcon);

    let likesNumberText = document.createElement('p');
    likesNumberText.innerText = bookLikeNumber;
    likesContainer.appendChild(likesNumberText);

    let commentContainer = document.createElement('div');
    commentContainer.classList.add('commentContainer');
    generalInformation.appendChild(commentContainer);

    let commentIconContainer = document.createElement('button');
    commentContainer.title = 'View Comments';
    commentContainer.addEventListener('click', function(){
        showComments(bookComments);
    });
    commentContainer.appendChild(commentIconContainer);

    let commentIcon = document.createElement('i');
    commentIcon.classList.add('fas');
    commentIcon.classList.add('fa-comment');
    commentIconContainer.appendChild(commentIcon);

    let commentNumberText = document.createElement('p');
    commentNumberText.innerText = bookCommentsNumber;
    commentContainer.appendChild(commentNumberText);

    let user = document.createElement('a');
    user.href = 'userDetail.php?username=' + book.username_creatore;
    user.innerText = book.username_creatore;
    generalInformation.appendChild(user);

    let date = document.createElement('p');
    date.innerText = book.data_creazione;
    generalInformation.appendChild(date);
}

window.onload = async function(){
    loadMenu();

    let bookId = queryString('id');
    let bookArray = await loadBooks();
    let book = bookArray.find(book => book.id == bookId);
    let bookAllComments = await loadBookComments();
    let bookLikes = await loadBookLikes();
    let bookComments = bookAllComments.filter(comment => comment.id == bookId);
    let bookLike = bookLikes.find(like => like.id == bookId);

    buildPage(book, bookLike.likes.length, bookComments.length, bookComments, bookLike.likes);
}