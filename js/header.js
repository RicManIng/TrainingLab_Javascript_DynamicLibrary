const username = document.body.getAttribute('data-username');

function queryString(name) {
    let value = null;

    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.has(prop) ? searchParams.get(prop) : null
    });
    value = params[name];
    return value;
}


export async function loadMenu() {
    const response = await fetch('./resources/database/navMenu.json');
    const menuArray = await response.json();
    
    menuArray.forEach((item) => {
        if(username){
            if(item.id != 3){
                createElement(item);
            }
        } else {
            if(item.id != 4){
                createElement(item);
            }
        }
    });
}


function createElement(elt){
    let li = document.createElement('li');
    let a = document.createElement('a');
    let idSel = queryString('selected');
    a.href = elt.url;
    a.textContent = elt.name;
    if(idSel == elt.id){
        a.classList.add('selected');
    }
    li.appendChild(a);
    document.querySelector('header nav ul').appendChild(li);
}