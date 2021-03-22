// 1. Створити сайт використовуючи swapi.dev. 
// вибрати 1 з 6 проперті (films, characters etc..)
// і зробити запит по них, вибрати одну з перших проперті що отримаєте і 
// витягнувши з неї "url" - отримати конкретну(планету,фільм, персонажа) з всією інформацією про нього.
//  Додати кнопку при натисканні на яку вивести всю наявну інформацію на екран красиво структуровано. 
// 2. Використовуючи параметр серч, розробити сайт який буде з допомогою інпута робити пошук за конкретним параметром 
// і виводити дані на сторінку. (якщо 1 знахідка - вивести всю інфу про айтем, якщо більше 1 то вивести список по філду).

// 3. Почитати про CRUD, розібратись з роботою https://github.com/arpanpatel/fetch-local-file-using-react

// .https://apptractor.ru/info/articles/10-rest-api.html

// 5. https://github.com/axios/axios

let PLANETS_ARR = [];

const PLANET_CONTAINER = [];
const PLANETS_WRAPPER = document.getElementsByClassName('planetsList')[0];

let API_RESULT = {};

function getData(url = 'https://swapi.dev/api/planets/?page=1') {
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then(dataPlanets => {
            API_RESULT = dataPlanets;
            PLANETS_ARR = [];
            const DATA_PLANETS = dataPlanets.results;
            for (let i = 0; i < DATA_PLANETS.length; i++) {
                PLANETS_ARR.push({
                    name: DATA_PLANETS[i].name,
                    diameter: DATA_PLANETS[i].diameter,
                    climate: DATA_PLANETS[i].climate
                })
            }
        }).then(dataPlanets => {
            for (let i = 0; i < PLANETS_ARR.length; i++) {
                let dataPlanet = document.createElement('li')
                dataPlanet.textContent = PLANETS_ARR[i].name;
                let planet = document.createElement('ul');
                let buttonWrapper = document.createElement('li');
                let buttonInfo = document.createElement('button');
                buttonWrapper.append(buttonInfo);
                buttonInfo.textContent = 'More information';
                for (let key in PLANETS_ARR[i]) {
                    if (key !== 'name') {
                        let planetProp = document.createElement('li');
                        planetProp.textContent = `${key}: ${PLANETS_ARR[i][key]}`;
                        planet.append(planetProp)
                    };
                }
                planet.append(buttonWrapper);
                dataPlanet.append(planet);
                PLANETS_WRAPPER.append(dataPlanet)
            }
        })
        ;
};

getData();

const PREV = document.getElementById('prev');
const NEXT = document.getElementById('next');

NEXT.addEventListener('click', () => {
    PREV.disabled = false;
    if (API_RESULT.next !== null) {
        PLANETS_WRAPPER.innerHTML = '';
        let nextLink = `https${(API_RESULT.next).slice(4)}`
        getData(nextLink)
    } else {
        NEXT.disabled = true;
    };
});

PREV.addEventListener('click', () => {
    if (API_RESULT.previous !== null) {
        NEXT.disabled = false;
        PLANETS_WRAPPER.innerHTML = '';
        let prevLink = `https${(API_RESULT.next).slice(4)}`
        getData(prevLink)
    } else {
        PREV.disabled = true;
    };
});

// task 2

let searchValue = document.getElementById('searchValue');

let searchBut = document.getElementById('searchBut');

let userName = '';

searchValue.addEventListener('input', e => {
    userName = searchValue.value;
    console.log(userName);
});

const USERS_WRAPPER = document.createElement('section');

searchBut.addEventListener('click', () => {
    fetch(`https://api.github.com/search/users?q=${userName}`)
        .then(value => value.json())
        .then(value => {
            console.log(value)
            return value;
        })
        .then(users => {
            let usersArr = [];
            for (let i = 0; i < users.items.length; i++) {
                console.log(users.items[i].login)
                usersArr.push({
                    login: users.items[i].login,
                    id: users.items[i].id,
                    type: users.items[i].type,
                    url: users.items[i].html_url,
                    avatar: users.items[i].avatar_url
                });
            }


            USERS_WRAPPER.innerHTML = "";

            USERS_WRAPPER.style.display = "flex";
            USERS_WRAPPER.style.flexWrap = "wrap";
            USERS_WRAPPER.style.alignItems = "center";
            USERS_WRAPPER.style.justifyContent = "center";


            for (let j = 0; j < usersArr.length; j++) {
                const USER_WRAPPER = document.createElement('div');
                const USER_AVATAR_WRAPPER = document.createElement('a');
                const USER_AVATAR = document.createElement('img');
                const USER_NAME = document.createElement('h2');
                const USER_TYPE = document.createElement('p');
                const USER_ID = document.createElement('p');

                USER_AVATAR_WRAPPER.href = usersArr[j].url;
                USER_AVATAR_WRAPPER.target = "_blank";
                USER_AVATAR.src = usersArr[j].avatar;
                USER_NAME.textContent = usersArr[j].login;
                USER_TYPE.textContent = usersArr[j].type;
                USER_ID.textContent = usersArr[j].id;

                USER_WRAPPER.style.margin = "20px 20px";
                USER_WRAPPER.style.textAlign = "center";

                USER_AVATAR.style.width = "300px";
                USER_AVATAR.style.borderRadius = "30%";

                USER_NAME.style.textTransform = "uppercase";
                USER_NAME.style.fontWeight = "700";

                USER_AVATAR_WRAPPER.append(USER_AVATAR);
                USER_WRAPPER.append(USER_AVATAR_WRAPPER);
                USER_WRAPPER.append(USER_NAME);
                USER_WRAPPER.append(USER_TYPE);
                USER_WRAPPER.append(USER_ID);
                USERS_WRAPPER.append(USER_WRAPPER);
            }
            document.body.append(USERS_WRAPPER);
        }).catch(error => { alert('Wrong nickname') });
});