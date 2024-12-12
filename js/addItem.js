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
    }

    if(activeStarCount == 0){
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
    let allCheckTrue = true;

    let imageFile = $('#image-file');
    let title = $('#book-title');
    let author = $('#book-author');
    let bookType = $('#book-type');
    let url = $('#how-to-find');
    let summary = $('#summary');
    let review = $('#review');

    if (imageFile.val() === ''){
        allCheckTrue = false;
    }

    if (title.val() === ''){
        allCheckTrue = false;
    }

    if (author.val() === ''){
        allCheckTrue = false;
    }

    if (bookType.val() === ''){
        allCheckTrue = false;
    }

    if (url.val() === '' || !url.val().includes('http')){
        allCheckTrue = false;
    }

    if (summary.val().length < 200 || summary.val().length > 1000){
        allCheckTrue = false;
    }

    if (review.val().length < 500 || review.val().length > 5000){
        allCheckTrue = false;
    }

    let submitButton = $('#submit-button');
    if (allCheckTrue){
        submitButton.attr('disabled', false);
    } else {
        submitButton.attr('disabled', true);
    }
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

    let imageFile = $('#image-file');
    imageFile.on('change', function(){
        if (imageFile.val() === ''){
            $('#image-file-error').remove();
            let error = $('<p></p>')
                .text('Image is required')
                .attr('id', 'image-file-error')
                .css({
                    'color': 'red',
                    'font-size': '0.8rem',
                    'margin-bottom': '5vh'
                });

            error.insertAfter(imageFile);
            imageFile.attr('class', '');
        } else {
            $('#image-file-error').remove();
            imageFile.attr('class', 'selection');
            checkForm();
        }
    });

    let title = $('#book-title');
    title.on('blur', function(){
        if (title.val() === ''){
            $('#book-title-error').remove();

            let error = $('<p></p>')
                .text('Title is required')
                .attr('id', 'book-title-error')
                .css({
                    'color': 'red',
                    'font-size': '0.8rem',
                    'margin-bottom': '5vh'
                });

            error.insertAfter(title);
        } else {
            $('#book-title-error').remove();
            checkForm();
        }
    });

    let author = $('#book-author');
    author.on('blur', function(){
        if (author.val() === ''){
            $('#book-author-error').remove();

            let error = $('<p></p>')
                .text('Author is required')
                .attr('id', 'book-author-error')
                .css({
                    'color': 'red',
                    'font-size': '0.8rem',
                    'margin-bottom': '5vh'
                });

            error.insertAfter(author);
        } else {
            $('#book-author-error').remove();
            checkForm();
        }
    });

    let bookType = $('#book-type');
    bookType.on('change', function(){
        if (bookType.val() === ''){
            $('#book-type-error').remove();

            let error = $('<p></p>')
                .text('Type is required')
                .attr('id', 'book-type-error')
                .css({
                    'color': 'red',
                    'font-size': '0.8rem',
                    'margin-bottom': '5vh'
                });

            error.insertAfter(bookType);
        } else {
            $('#book-type-error').remove();
            checkForm();
        }
    });

    let url = $('#how-to-find');
    url.on('blur', function(){
        if (url.val() === ''){
            $('#how-to-find-error').remove();

            let error = $('<p></p>')
                .text('URL is required')
                .attr('id', 'how-to-find-error')
                .css({
                    'color': 'red',
                    'font-size': '0.8rem',
                    'margin-bottom': '5vh'
                });

            error.insertAfter(url);
        } else if (!url.val().includes('http')){
            $('#how-to-find-error').remove();

            let error = $('<p></p>')
                .text('URL must start with http')
                .attr('id', 'how-to-find-error')
                .css({
                    'color': 'red',
                    'font-size': '0.8rem',
                    'margin-bottom': '5vh'
                });

            error.insertAfter(url);
        } else {
            $('#how-to-find-error').remove();
            checkForm();
        }
    });

    let summary = $('#summary');
    summary.on('keyup', function(){
        let summaryLength = summary.val().length;
        let summaryCounter = $('#summary-counter');
        if (summaryLength < 200 || summaryLength > 1000){
            summaryCounter.text('200/' + summaryLength + '/1000');
            summaryCounter.css('color', 'red');
        } else {
            summaryCounter.text('');
            checkForm();
        }
    });

    let review = $('#review');
    review.on('keyup', function(){
        let reviewLength = review.val().length;
        let reviewCounter = $('#review-counter');
        if (reviewLength < 500 || reviewLength > 5000){
            reviewCounter.css('color', 'red');
            reviewCounter.text('500/' + reviewLength + '/5000');
        } else {
            reviewCounter.text('');
            checkForm();
        }
    });

}
