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

        let allCheckTrue = false;

        if (name != '' && lastname != '' && email != '' && username != '' && password != '' && confirmPassword != '' && age != ''){
            if (password == confirmPassword){
                allCheckTrue = true;
            }
        }
    }
    let name = document.getElementById('name');
    name.addEventListener('blur', function(){
        if (name.value == ''){
            let error = document.createElement('p');
            error.innerHTML = 'Name is required';
            error.id = 'name-error';
            name.insertAfter(error);
        } else {
            let error = document.getElementById('name-error');
            if (error){
                error.remove();
            }
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