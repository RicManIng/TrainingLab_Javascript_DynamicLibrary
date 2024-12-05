export async function loadBookTypes() {
    const response = await fetch('./resources/database/bookTypes.json');
    const data = await response.json();
    return data;
}

export async function loadBooks() {
    const response = await fetch('./resources/database/book.json');
    const data = await response.json();
    return data;
}

export async function loadBookComments() {
    const response = await fetch('./resources/database/bookComments.json');
    const data = await response.json();
    return data;
}

export async function loadBookLikes() {
    const response = await fetch('./resources/database/bookLikes.json');
    const data = await response.json();
    return data;
}

export async function loadUser() {
    const response = await fetch('./resources/database/user.json');
    const data = await response.json();
    return data;
}

export function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const midHeight = rect.top + rect.height / 2;
    return midHeight <= (window.innerHeight || document.documentElement.clientHeight) && midHeight >= 0;
}