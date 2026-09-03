document.body.onload = started;

// инициализация
function started () {
    const button = document.createElement('button');
    button.textContent = 'Нажми меня';
    button.className = 'my-button';
    button.id = "newElement";
    document.body.append(button);

    button.addEventListener('click', buttonClick)
}

// клик по кнопке
function buttonClick () {
    const idElement = nextId();

    createValue(idElement);
    createSum(idElement);
}

// генерация ид
const nextId = createIdGenerator();

function createIdGenerator () {
    let countId = 0;

    return function() {
        return countId++
    }
}

// создание полей ввода
function createValue (idElement) {
    const element = document.createElement('div');
    element.id = idElement;

    const inputGramm = document.createElement('input');
    const inputPrice = document.createElement('input');
    
    createInput(inputGramm, "inputGramm", idElement)
    createInput(inputPrice, "inputPrice", idElement)
    
    document.body.append(element);

    element.append(inputGramm);
    element.append(inputPrice);

    inputGramm.addEventListener("input", calculator)
    inputPrice.addEventListener("input", calculator)
}

// наполнение полей ввода
function createInput (inputName, name, id) {
    inputName.type = "number";
    inputName.name = name;
    inputName.value = "0";
    inputName.dataset.id = id;
}

function createSum(idElement) {
    const element = document.getElementById(idElement);
    const text = document.createElement('span');
    text.dataset.id = idElement
    element.append(text);
}

// Лучший выбор 
const datalist = [];

function calculator (event) {
    const element = document.getElementById(event.currentTarget.dataset.id);
    const gramm = element.querySelector('[name="inputGramm"]').value;
    const price = element.querySelector('[name="inputPrice"]').value;
    const text = element.getElementsByTagName("span")[0];
    
    text.textContent = price / gramm * 100
    console.log(element, price, gramm, text)
}
