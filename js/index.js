window.onload = function() {    
    let title = document.querySelector('h1');
    let subtitle = document.querySelector('p');
    let button = document.querySelector('a');
    title.style.position = 'relative';
    title.style.left = '-100%';
    title.style.transition = 'all 0.5s';
    subtitle.style.position = 'relative';
    subtitle.style.left = '-100%';
    subtitle.style.transition = 'all 0.5s';
    button.style.position = 'relative';
    button.style.left = '-100%';
    button.style.transition = 'all 0.5s';

    setTimeout(() => {
        title.style.left = '0';
    }, 500);
    setTimeout(() => {
        subtitle.style.left = '0';
    }, 1000);
    setTimeout(() => {
        button.style.left = '0';
    }, 1500);
}