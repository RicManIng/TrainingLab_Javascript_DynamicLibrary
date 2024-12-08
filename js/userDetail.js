import { loadMenu } from './header.js';
import { queryString, loadBooks, loadBookComments, loadBookLikes, loadUser, calculateAge} from './utils.js';

function buildPage(user, bookUserArray){
    let userContainer = document.createElement('div');
    userContainer.id = 'userContainer';
    document.querySelector('main').appendChild(userContainer);

    let imageContainer = document.createElement('div');
    imageContainer.id = 'imageContainer';
    imageContainer.style.backgroundImage = `url(${user.avatar})`;
    imageContainer.style.backgroundSize = 'cover';
    imageContainer.style.backgroundPosition = 'center';
    imageContainer.style.backgroundRepeat = 'no-repeat';
    userContainer.appendChild(imageContainer);

    let infoContainer = document.createElement('div');
    infoContainer.id = 'infoContainer';
    userContainer.appendChild(infoContainer);

    let name = document.createElement('h1');
    name.textContent = user.nome + ' ' + user.cognome;
    infoContainer.appendChild(name);

    let age = document.createElement('p');
    age.textContent = 'Età: ' + calculateAge(user.data_di_nascita);
    infoContainer.appendChild(age);

    let username = document.createElement('p');
    username.textContent = 'Username: ' + user.username;
    infoContainer.appendChild(username);

    let email = document.createElement('p');
    email.textContent = 'Email: ' + user.email;
    infoContainer.appendChild(email);

    let averageReviewContainer = document.createElement('div');
    averageReviewContainer.id = 'averageReviewContainer';
    infoContainer.appendChild(averageReviewContainer);

    let averageText = document.createElement('p');
    averageText.textContent = 'Average review score: ';
    averageReviewContainer.appendChild(averageText);

    let averageReview = caluclateAverageRating(bookUserArray);

    for (let i = 0; i < 5; i++){
        if (averageReview >= 0.8){
            let star = document.createElement('i');
            star.className = 'fas fa-star colored';
            averageReviewContainer.appendChild(star);
        } else if (averageReview >= 0.2){
            let star = document.createElement('i');
            star.className = 'fas fa-star-half-alt colored';
            averageReviewContainer.appendChild(star);
        } else {
            let star = document.createElement('i');
            star.className = 'far fa-star';
            averageReviewContainer.appendChild(star);
        }
        averageReview--;
    }
    
}

function loadUserReviews(bookUserArray, bookUserComments, bookUserLikes){
    let reviewTitle = document.createElement('h2');
    reviewTitle.textContent = 'Reviews';
    document.querySelector('main').appendChild(reviewTitle);
    bookUserArray.forEach(book => {
        let bookComments = bookUserComments.filter(comment => comment.id == book.id);
        let bookLikes = bookUserLikes.filter(like => like.id == book.id);

        let reviewCard = document.createElement('div');
        reviewCard.className = 'reviewCard';
        document.querySelector('main').appendChild(reviewCard);

        let reviewTitle = document.createElement('h4');
        reviewTitle.textContent = book.titolo;
        reviewCard.appendChild(reviewTitle);

        let reviewLikeContainer = document.createElement('div');
        reviewLikeContainer.className = 'reviewLikeContainer';
        reviewCard.appendChild(reviewLikeContainer);
        let reviewLikeIcon = document.createElement('i');
        reviewLikeIcon.className = 'fas fa-thumbs-up';
        reviewLikeContainer.appendChild(reviewLikeIcon);
        let reviewLikeNumber = document.createElement('p');
        reviewLikeNumber.textContent = bookLikes[0].likes.length;
        reviewLikeContainer.appendChild(reviewLikeNumber);

        let reviewCommentContainer = document.createElement('div');
        reviewCommentContainer.className = 'reviewCommentContainer';
        reviewCard.appendChild(reviewCommentContainer);
        let reviewCommentIcon = document.createElement('i');
        reviewCommentIcon.className = 'fas fa-comment';
        reviewCommentContainer.appendChild(reviewCommentIcon);
        let reviewCommentNumber = document.createElement('p');
        reviewCommentNumber.textContent = bookComments.length;
        reviewCommentContainer.appendChild(reviewCommentNumber);

        let button = document.createElement('button');
        button.textContent = 'View';
        button.addEventListener('click', () => {
            window.location.href = `reviewDetail.php?id=${book.id}`;
        });
        reviewCard.appendChild(button);
    });
}

function loadUserComments(bookUserComments, bookArray){
    let commentTitle = document.createElement('h2');
    commentTitle.textContent = 'Comments';
    document.querySelector('main').appendChild(commentTitle);
    bookUserComments.forEach(comment => {
        let book = bookArray.find(book => book.id == comment.id);

        let commentCard = document.createElement('div');
        commentCard.className = 'commentCard';
        document.querySelector('main').appendChild(commentCard);

        let commentTitle = document.createElement('h4');
        commentTitle.textContent = book.titolo;
        commentCard.appendChild(commentTitle);

        let commentLikesContainer = document.createElement('div');
        commentLikesContainer.className = 'commentLikesContainer';
        commentCard.appendChild(commentLikesContainer);
        let commentLikesIcon = document.createElement('i');
        commentLikesIcon.className = 'fas fa-thumbs-up';
        commentLikesContainer.appendChild(commentLikesIcon);
        let commentLikesNumber = document.createElement('p');
        commentLikesNumber.textContent = comment.likes.length;
        commentLikesContainer.appendChild(commentLikesNumber);

        let button = document.createElement('button');
        button.textContent = 'View';
        button.addEventListener('click', () => {
            window.location.href = `reviewDetail.php?id=${book.id}`;
        });
        commentCard.appendChild(button);
    });
}

function loadUserLikes(bookUserLikes, bookCommentUserLike, bookArray){
    let likeTitle = document.createElement('h2');
    likeTitle.textContent = 'Likes';
    document.querySelector('main').appendChild(likeTitle);
    bookUserLikes.forEach(like => {
        let book = bookArray.find(book => book.id == like.id);

        let likeCard = document.createElement('div');
        likeCard.className = 'likeCard';
        document.querySelector('main').appendChild(likeCard);

        let likeTitle = document.createElement('h4');
        likeTitle.textContent = book.titolo;
        likeCard.appendChild(likeTitle);

        let likeType = document.createElement('p');
        likeType.textContent = 'Book';
        likeCard.appendChild(likeType);

        let button = document.createElement('button');
        button.textContent = 'View';
        button.addEventListener('click', () => {
            window.location.href = `reviewDetail.php?id=${book.id}`;
        });
        likeCard.appendChild(button);
    });

    bookCommentUserLike.forEach(like => {
        let book = bookArray.find(book => book.id == like.id);

        let likeCard = document.createElement('div');
        likeCard.className = 'likeCard';
        document.querySelector('main').appendChild(likeCard);

        let likeTitle = document.createElement('h4');
        likeTitle.textContent = book.titolo;
        likeCard.appendChild(likeTitle);

        let likeType = document.createElement('p');
        likeType.textContent = 'Comment';
        likeCard.appendChild(likeType);

        let commentUser = document.createElement('a');
        commentUser.textContent = like.username;
        commentUser.addEventListener('click', () => {
            window.location.href = `userDetail.php?username=${like.username}`;
        });
        likeCard.appendChild(commentUser);

        let button = document.createElement('button');
        button.textContent = 'View';
        button.addEventListener('click', () => {
            window.location.href = `reviewDetail.php?id=${book.id}`;
        });
        likeCard.appendChild(button);
    });
}

function showNoUserFound(){
    let noUserFound = document.createElement('h1');
    noUserFound.textContent = 'No user found';
    document.querySelector('main').appendChild(noUserFound);
}

function caluclateAverageRating(bookUserArray){
    let sum = 0;
    bookUserArray.forEach(book => {
        sum += book.valutazione;
    });
    return sum/bookUserArray.length;
}

window.onload = async function(){
    loadMenu();

    const username = queryString('username');
    const userArray = await loadUser();
    const user = userArray.find(user => user.username == username);
    if (!user){
        showNoUserFound();
    } else {
        const bookArray = await loadBooks();
        const bookComments = await loadBookComments();
        const bookLikes = await loadBookLikes();

        const bookUserArray = bookArray.filter(book => book.username_creatore == username);

        buildPage(user, bookUserArray);
        loadUserReviews(bookUserArray, bookComments, bookLikes);

        let bookUserComments = bookComments.filter(comment => comment.username == username);
        loadUserComments(bookUserComments, bookArray);

        let bookUserLikes = bookLikes.filter(booklike => {
            return booklike.likes.find(like => like == username);
        });
        let bookCommentUserLike = bookComments.filter(comment => {
            return comment.likes.find(like => like == username);
        });
        
        loadUserLikes(bookUserLikes, bookCommentUserLike, bookArray);
    }
    
}