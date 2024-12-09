import { loadMenu } from './header.js';
import { loadUser, queryString } from './utils.js';

function manageRegistrationForm(userArray){
    function checkRegistrationForm(userArray){
        let name = document.getElementById('name').value;
        let lastname = document.getElementById('lastname').value;
        let email = document.getElementById('email').value;
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let confirmPassword = document.getElementById('confirm-password').value;
        let age = document.getElementById('age').value;
        let button = document.querySelector('button[type="submit"]');

        let allCheckTrue = false;

        if (name != '' && lastname != '' && email != '' && username != '' && password != '' && confirmPassword != '' && age != ''){
            if (password == confirmPassword){
                if (email.indexOf('@') != -1 && email.indexOf('.') != -1){
                    allCheckTrue = true;
                }
            }
        }

        if (allCheckTrue){
            button.disabled = false;
        } else {
            button.disabled = true;
        }
    }
    let name = $('#name');
    name.on('blur', function(){
        if (name.val() === ''){
            // Rimuovi eventuali messaggi di errore precedenti
            $('#name-error').remove();
            
            // Crea un nuovo elemento di errore usando jQuery
            let error = $('<p></p>')
                .text('Name is required')
                .attr('id', 'name-error')
                .css({
                    'color': 'darkred',
                    'font-size': '0.8rem',
                    'margin-bottom': '5px'
                });
            
            // Inserisci l'elemento di errore dopo l'input 'name'
            error.insertAfter(name);
        } else {
            // Rimuovi l'elemento di errore se presente
            $('#name-error').remove();
        }
        checkRegistrationForm(userArray);
    });

    let lastname = $('#lastname');
    lastname.on('blur', function(){
        if (lastname.val() === ''){
            // Rimuovi eventuali messaggi di errore precedenti
            $('#lastname-error').remove();
            
            // Crea un nuovo elemento di errore usando jQuery
            let error = $('<p></p>')
                .text('Lastname is required')
                .attr('id', 'lastname-error')
                .css({
                    'color': 'darkred',
                    'font-size': '0.8rem',
                    'margin-bottom': '5px'
                });
            
            // Inserisci l'elemento di errore dopo l'input 'lastname'
            error.insertAfter(lastname);
        } else {
            // Rimuovi l'elemento di errore se presente
            $('#lastname-error').remove();
        }
        checkRegistrationForm(userArray);
    });

    let email = $('#email');
    email.on('blur', function(){
        if (email.val() === ''){
            // Rimuovi eventuali messaggi di errore precedenti
            $('#email-error').remove();
            
            // Crea un nuovo elemento di errore usando jQuery
            let error = $('<p></p>')
                .text('Email is required')
                .attr('id', 'email-error')
                .css({
                    'color': 'darkred',
                    'font-size': '0.8rem',
                    'margin-bottom': '5px'
                });
            
            // Inserisci l'elemento di errore dopo l'input 'email'
            error.insertAfter(email);
        } else if (email.val().indexOf('@') === -1 || email.val().indexOf('.') === -1){
            // Rimuovi eventuali messaggi di errore precedenti
            $('#email-error').remove();
            
            // Crea un nuovo elemento di errore usando jQuery
            let error = $('<p></p>')
                .text('Email is not valid')
                .attr('id', 'email-error')
                .css({
                    'color': 'darkred',
                    'font-size': '0.8rem',
                    'margin-bottom': '5px'
                });
            
            // Inserisci l'elemento di errore dopo l'input 'email'
            error.insertAfter(email);
        } else {
            // Rimuovi l'elemento di errore se presente
            $('#email-error').remove();
        }
        checkRegistrationForm(userArray);
    });

    let username = $('#username');
    username.on('blur', function(){
        if (username.val() === ''){
            // Rimuovi eventuali messaggi di errore precedenti
            $('#username-error').remove();
            
            // Crea un nuovo elemento di errore usando jQuery
            let error = $('<p></p>')
                .text('Username is required')
                .attr('id', 'username-error')
                .css({
                    'color': 'darkred',
                    'font-size': '0.8rem',
                    'margin-bottom': '5px'
                });
            
            // Inserisci l'elemento di errore dopo l'input 'username'
            error.insertAfter(username);
        } else {
            // Rimuovi l'elemento di errore se presente
            $('#username-error').remove();
        }
        checkRegistrationForm(userArray);
    });

    let password = $('#password');
    password.on('blur', function(){
        if (password.val() === ''){
            // Rimuovi eventuali messaggi di errore precedenti
            $('#password-error').remove();
            
            // Crea un nuovo elemento di errore usando jQuery
            let error = $('<p></p>')
                .text('Password is required')
                .attr('id', 'password-error')
                .css({
                    'color': 'darkred',
                    'font-size': '0.8rem',
                    'margin-bottom': '5px'
                });
            
            // Inserisci l'elemento di errore dopo l'input 'password'
            error.insertAfter(password);
        } else {
            // Rimuovi l'elemento di errore se presente
            $('#password-error').remove();
        }
        checkRegistrationForm(userArray);
    });

    let confirmPassword = $('#confirm-password');
    confirmPassword.on('blur', function(){
        if (confirmPassword.val() === ''){
            // Rimuovi eventuali messaggi di errore precedenti
            $('#confirm-password-error').remove();
            
            // Crea un nuovo elemento di errore usando jQuery
            let error = $('<p></p>')
                .text('Confirm password is required')
                .attr('id', 'confirm-password-error')
                .css({
                    'color': 'darkred',
                    'font-size': '0.8rem',
                    'margin-bottom': '5px'
                });
            
            // Inserisci l'elemento di errore dopo l'input 'confirm-password'
            error.insertAfter(confirmPassword);
        } else if (confirmPassword.val() !== password.val()){
            // Rimuovi eventuali messaggi di errore precedenti
            $('#confirm-password-error').remove();
            
            // Crea un nuovo elemento di errore usando jQuery
            let error = $('<p></p>')
                .text('Passwords do not match')
                .attr('id', 'confirm-password-error')
                .css({
                    'color': 'darkred',
                    'font-size': '0.8rem',
                    'margin-bottom': '5px'
                });
            
            // Inserisci l'elemento di errore dopo l'input 'confirm-password'
            error.insertAfter(confirmPassword);
        } else {
            // Rimuovi l'elemento di errore se presente
            $('#confirm-password-error').remove();
        }
        checkRegistrationForm(userArray);
    });

    let age = $('#age');
    age.on('blur', function(){
        if (age.val() === ''){
            // Rimuovi eventuali messaggi di errore precedenti
            $('#age-error').remove();
            age.attr('class', '');
            
            // Crea un nuovo elemento di errore usando jQuery
            let error = $('<p></p>')
                .text('Age is required')
                .attr('id', 'age-error')
                .css({
                    'color': 'darkred',
                    'font-size': '0.8rem',
                    'margin-bottom': '5px'
                });
            
            // Inserisci l'elemento di errore dopo l'input 'age'
            error.insertAfter(age);
        } else {
            // Rimuovi l'elemento di errore se presente
            $('#age-error').remove();
            age.attr('class', 'is-full');
        }
        checkRegistrationForm(userArray);
    });

    let accountImage = $('#account-image');
    accountImage.on('change', function(){
        console.log(accountImage.val());
        if (accountImage.val() === ''){
            accountImage.attr('class', '');
        } else {
            // Rimuovi l'elemento di errore se presente
            accountImage.attr('class', 'is-full');
        }
        checkRegistrationForm(userArray);
    });
}

window.onload = async function() {
    await loadMenu();
    let userArray = await loadUser();

    let registrationForm = document.getElementById('register-form');
    if (registrationForm){
        manageRegistrationForm(userArray);
    }
}