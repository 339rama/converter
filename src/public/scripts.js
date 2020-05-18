document.addEventListener('DOMContentLoaded', function () {
    let userLang = navigator.language || navigator.userLanguage;
    const succes = (position) => {
        const lat = position.coords.latitude;
        const long= position.coords.longitude;
        console.log(lat,long);
        
    }
    const geoErr = () => {
        console.log('Geo error');
    } 
    console.log(userLang,  navigator.geolocation.getCurrentPosition(succes, geoErr));
    // var date = new Date();

    // var options = {
    //     year: 'numeric',
    //     month: 'numeric',
    //     day: 'numeric',
    //     timezone: 'UTC',
    //     hour: 'numeric',
    //     minute: 'numeric'
    // };
    // console.log(date.toLocaleString("ru", options));
    // console.log(date.toLocaleString("en-US", options));
    // let time = `${date.getFullYear()}-${date.getDate()}-${date.getMonth()} ${date.getHours()}:${date.getMinutes()} UTC`;
    // console.log(time);
    // if (document.getElementById('time')){
    //     document.getElementById('time').textContent = time;
    // }

    // let lng_sets = document.querySelectorAll('div.lng-settings div.item');
    // [...lng_sets].forEach(el =>{
    //     el.addEventListener('click', openSubSet);
    // });
    
});

function ButtonPlusMinus(el) {
    let input = el.parentNode.querySelector('input[type=number]');
    let sum = Number(input.value) + Number(el.dataset.weight);
    if (sum>0){
        input.value = sum;
        selectSubCurrency(input);
    }   
}

function openLng(el) {
    document.querySelector('div.lng-settings').classList.add('open');
    document.querySelector('body').classList.add('unscroll');
}
function closeLng(el) {
    document.querySelector('div.lng-settings').classList.remove('open');
    document.querySelector('body').classList.remove('unscroll');
}

function openSubSet(el) {
    console.log(el.target);
    el.target.parentNode.querySelector('div.sub').classList.add('open');
    // el.parentNode.querySelector('div.sub').classList.add('open');
    document.getElementById('logo').style.cssText = 'z-index: 3;';
    document.querySelector('body').classList.add('unscroll');
}
function closeSubSet(el) {
    console.log(el.target);
    el.parentNode.parentNode.classList.remove('open');
    document.getElementById('logo').removeAttribute('style');
    document.querySelector('body').classList.remove('unscroll');
}

function focusSet(el) {
    el.parentNode.parentNode.classList.add('open');
    document.getElementById('logo').removeAttribute('style');
}

function filterSet(el) {
    let value = el.value.toLowerCase();
    let vars = el.parentNode.nextElementSibling.children;
    [...vars].forEach(el => {
        if (el.innerHTML.toLowerCase().indexOf(value) != -1) {
            el.removeAttribute('style');
        } else {
            el.style.cssText = "display: none;";
        }
    });
}

function filterSearch(el) {
    let value = el.value.toLowerCase();
    let list = el.parentNode.querySelector('ul');
    let vars = list.querySelectorAll('li');
    for (let i = 0; i < vars.length; i++) {
        if (vars[i].innerHTML.toLowerCase().indexOf(value) != -1) {
            vars[i].removeAttribute('style');
        } else {
            vars[i].style.cssText = "display: none;";
        }
    }
}

function closeFocusedSet(el) {
    el.parentNode.parentNode.classList.remove('open');
    document.getElementById('logo').style.cssText = 'z-index: 3;';
    document.querySelector('body').classList.remove('unscroll');
}

function currencySub(el) {
    el.nextElementSibling.classList.add('open');
    el.nextElementSibling.querySelector('input').focus();
    document.querySelector('body').classList.add('unscroll');
}

function selectSubCurrency(el) {
    let submit = document.getElementById('submit');
    let href = submit.getAttribute('href');
    let position = Number(el.dataset.position);
    let splited_href = href.split('/');
    console.log(splited_href);
    console.log(position);
    
    if (!el.getAttribute('type')){
        el.parentNode.parentNode.classList.remove('open');
        el.parentNode.parentNode.previousElementSibling.querySelector('p.change-name').textContent = el.dataset.value;
        el.parentNode.parentNode.previousElementSibling.querySelector('img.change-img').setAttribute('src', el.dataset.image);
        splited_href[position] = el.dataset.value;
    } else {
        splited_href[position] = el.value;
    }
    href = splited_href.join('/');
    submit.setAttribute('href', href);
    document.querySelector('body').classList.remove('unscroll');
}

function changeValues(el) {
    let first_el = document.querySelector('div.first');
    let first_img = first_el.querySelector('img.change-img').getAttribute('src');
    let first_name = first_el.querySelector('p.change-name').textContent;
    let first_position = first_el.dataset.position;
    
    let second_el = document.querySelector('div.second');
    let second_img = second_el.querySelector('img.change-img').getAttribute('src');
    let second_name = second_el.querySelector('p.change-name').textContent;
    let second_position = second_el.dataset.position;
    [
        first_el.querySelector('p.change-name').textContent, 
        second_el.querySelector('p.change-name').textContent
    ] = [
        second_name, 
        first_name
    ];
    first_el.querySelector('img.change-img').setAttribute('src', second_img);
    second_el.querySelector('img.change-img').setAttribute('src', first_img);
    let submit = document.getElementById('submit');
    let href = submit.getAttribute('href');
    let splited_href = href.split('/');    
    splited_href[first_position] = second_name;
    splited_href[second_position] = first_name;
    href = splited_href.join('/');    
    submit.setAttribute('href', href);
}

function seeMore(el) {
    el.nextElementSibling.classList.remove('dn');
    el.parentNode.removeChild(el);
}

function openSubMenu(el) {
    el.classList.toggle('open');
}

function openMainMenu(el) {
    document.querySelector('div.main-menu').classList.add('open');
    document.querySelector('body').classList.add('unscroll');
}
function closeMainMenu(el) {
    document.querySelector('div.main-menu').classList.remove('open');
    document.querySelector('body').classList.remove('unscroll');
}