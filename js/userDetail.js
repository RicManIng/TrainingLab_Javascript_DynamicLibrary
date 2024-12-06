import { loadMenu } from './header.js';
import { queryString, loadBooks, loadBookComments, loadBookLikes, loadUser} from './utils.js';

function buildPage(user){

}

function loadUserReviews(user, bookUserArray, bookUserComments, bookUserLikes){

}

window.onload = async function(){
    loadMenu();

    const username = queryString('username');
    const userArray = await loadUser();
    const user = userArray.find(user => user.username == username);
    const bookArray = await loadBooks();
    const bookComments = await loadBookComments();
    const bookLikes = await loadBookLikes();

    buildPage(user);

    const bookUserArray = bookArray.filter(book => book.username_creatore == username);
    /* to implement */
}