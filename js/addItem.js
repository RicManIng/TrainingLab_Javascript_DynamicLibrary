import { loadMenu } from './header.js';
import { loadBookTypes } from './utils.js';

window.onload = async function() {
    await loadMenu();
}