document.body.onload = started;

// инициализация
function started() {
    const button = document.createElement('button');
    button.textContent = 'Нажми меня';
    button.className = 'my-button';
    button.id = "newElement";
    document.body.append(button);

    button.addEventListener('click', buttonClick)
}

// клик по кнопке
function buttonClick() {
    const idElement = thisId();

    createValue(idElement);
    createSum(idElement);
}

// генерация ид
const thisId = genereteId();

function genereteId() {
    let countId = 0;

    return function () {
        return countId++
    }
}

// создание полей ввода
function createValue(idElement) {
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

const values = new Map();

// наполнение полей ввода
function createInput(inputName, name, id) {
    inputName.type = "number";
    inputName.name = name;
    inputName.value = "0";
    inputName.dataset.id = id;
    inputName.min = 0;

    values.set(id, {
        gramm: 0,
        price: 0,
        result: Infinity
    });
}

function createSum(idElement) {
    const element = document.getElementById(idElement);
    const text = document.createElement('span');
    text.dataset.id = idElement
    text.textContent = "0";
    element.append(text);
}

// Лучший выбор 



function calculator(event) {
    const element = document.getElementById(event.currentTarget.dataset.id);
    const gramm = element.querySelector('[name="inputGramm"]').value;
    const price = element.querySelector('[name="inputPrice"]').value;
    const result = price / gramm * 100;
    const text = element.getElementsByTagName("span")[0];

    text.textContent = result

    values.set(event.currentTarget.dataset.id, {
        gramm,
        price,
        result
    });

    findMin();

}

function findMin() {
    let min = Infinity;
    let minId = null;

    for (const [id, data] of values) {
        if (data.result < min) {
            min = data.result;
            minId = id;
        }
    }

    console.log(minId, min);
}