document.body.onload = started;

// инициализация
function started() {
    const button = document.createElement('button');
    button.textContent = 'Нажми меня';
    button.className = 'my-button';
    button.id = "newElement";
    document.body.append(button);

    button.addEventListener('click', buttonClick);

    const products = getProducts();
    if (products.length > 0 && products !== null) {
        products.forEach((product) => {
            element = document.createElement('div');
            element.id = product.id;
            element.className = "product";
            const productHtml = `
                        <div class="product__rank"></div>
                        <div class="product__photo"></div>
                        <div class="product__name">${product.name}</div>
                        <div class="product__unit">${product.quantity.unit}</div>
                        <div class="product__price">${product.price}</div>
                        <div class="product__unitPrice"></div>
                        <div class="product__isBest"></div>
                        <div class="product__delite"></div>
                    
                `;
            element.innerHTML = productHtml;
            document.getElementById("products_container").insertAdjacentElement('afterbegin', element);
        });
    }
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
const products = [
    {
        id: "550e8400-e29b-41d4-a716-446655440000",
        name: "Греча от мироторг",
        photo: null,

        quantity: {
            value: 800,
            unit: "грамм",
            type: "Масса"
        },

        price: 120,

        createdAt: Date.now()
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440001",
        name: "Греча от мироторг 2",
        photo: null,

        quantity: {
            value: 600,
            unit: "грамм",
            type: "Масса"
        },

        price: 620,

        createdAt: Date.now()
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440003",
        name: "Греча от мироторг 3",
        photo: null,

        quantity: {
            value: 50,
            unit: "грамм",
            type: "Масса"
        },

        price: 20,

        createdAt: Date.now()
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440004",
        name: "Греча от мироторг 4",
        photo: null,

        quantity: {
            value: 680,
            unit: "грамм",
            type: "Масса"
        },

        price: 520,

        createdAt: Date.now()
    }
];

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

function getProducts() {
    return JSON.parse(
        localStorage.getItem('products') || '[]'
    );
}

function saveProducts(products) {
    localStorage.setItem(
        'products',
        JSON.stringify(products)
    );
}