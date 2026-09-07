document.body.onload = started;

// инициализация
function started() {
    const button = document.createElement('button');
    button.textContent = 'Нажми меня';
    button.className = 'my-button';
    button.id = "newElement";
    document.body.append(button);

    button.addEventListener('click', buttonClick);
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
        return countId++;
    }
}

// создание полей ввода
function createValue(idElement) {
    const element = document.createElement('div');
    element.id = idElement;

    const inputGramm = document.createElement('input');
    const inputPrice = document.createElement('input');

    createInput(inputGramm, "gramm", idElement);
    createInput(inputPrice, "price", idElement);

    document.body.append(element);

    element.append(inputGramm);
    element.append(inputPrice);

    inputGramm.addEventListener("input", calculator);
    inputPrice.addEventListener("input", calculator);
}

const values = new Map();

// наполнение полей ввода
function createInput(inputName, name, id) {
    inputName.type = "number";
    inputName.name = "input_" + name;
    inputName.value = "0";
    inputName.dataset[name + "Id"] = id;
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
    text.dataset.id = idElement;
    text.textContent = "0";
    element.append(text);
}

// Лучший выбор 

function calculator(event) {
    const element = event.currentTarget.parentElement;
    const id = element.id
    const gramm = element.querySelector('[name="input_gramm"]').value;
    const price = element.querySelector('[name="input_price"]').value;
    const result = price / gramm * 100;
    const text = element.getElementsByTagName("span")[0];

    text.textContent = result;

    values.set(id, {
        gramm,
        price,
        result
    });

    findMin();
}

function findMin() {
    let min = Infinity;
    const minId = [];

    for (const [id, data] of values) {
        if (data.result < min) {
            min = data.result;
            minId.length = 0;
            minId.push(id);
            console.log(data.result)
        } else if (data.result === min && data.result !== Infinity) {
            minId.push(id);
        } else {
            removeResultColor(id)
        }
    }

    bestResultColor(minId)
}

function bestResultColor(id) {
    id.forEach((id) => {
        document.querySelector(`[data-id="${id}"]`).style.color = 'blue';
    })
}
function removeResultColor(id) {
    document.querySelector(`[data-id="${id}"]`).style.color = 'black';
}