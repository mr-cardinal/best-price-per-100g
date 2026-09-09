document.body.onload = started;
const productsContainer = document.getElementById("product-container");
const products = getProducts();

// инициализация
function started() {
    const button = document.createElement('button');
    button.textContent = 'Нажми меня';
    button.className = 'my-button';
    button.id = "newElement";
    document.body.prepend(button);
    button.addEventListener('click', buttonClick);

    document.getElementById("add-product-button").addEventListener('click', addProduct);
    productsContainer.addEventListener('click', deleteProduct);

    if (products.length > 0 && products !== null) {
        renderProducts(products);
    } else {
        renderProducts(productsStart);
    }
}

function addProduct() {
    event.preventDefault();

    const name = document.getElementById("product-name").value;
    const quantityValue = document.getElementById("product-quantity").value;
    const quantityUnit = document.getElementById("product-unit").value;
    const price = document.getElementById("product-price").value;
    const photo = document.getElementById("product-photo").files[0];

    const newProduct = {
        id: crypto.randomUUID(),
        name: name,
        quantity: {
            value: parseFloat(quantityValue),
            unit: quantityUnit,

            normalizedValue: parseFloat(quantityValue),
            normalizedUnit: "g"
        },
        price: parseFloat(price),
        photo: photo
    };

    products.push(newProduct);
    saveProducts(products);
    renderUpdatedProducts();
}

function createProductElement(product) {
    const element = document.createElement('div');
    element.className = 'product';
    element.dataset.id = product.id;

    const productHtml = `
        <div class="product__rank"></div>
        <div class="product__photo"></div>
        <div class="product__name">${product.name}</div>
        <div class="product__unit">${product.quantity.value} ${product.quantity.unit}</div>
        <div class="product__price">${product.price}</div>
        <div class="product__unitPrice"></div>
        <div class="product__isBest"></div>
        <div class="product__delite">
            <button class="product__delete-btn">Удалить</button>
        </div>
    `;

    element.innerHTML = productHtml;

    return element;
}

function renderProducts(products) {
    const fragment = document.createDocumentFragment();

    products.forEach((product) => {
        fragment.appendChild(createProductElement(product));
    });

    productsContainer.appendChild(fragment);
}

function renderUpdatedProducts() {
    productsContainer.innerHTML = '';
    renderProducts(products);
}

function deleteProduct(event) {
    const button = event.target.closest('.product__delete-btn');
    if (!button) return;

    const productElement = button.closest('.product');
    const productId = productElement.dataset.id;

    index = products.indexOf(products.find(product => product.id === productId));

    if (index !== -1) {
        products.splice(index, 1);
        
        saveProducts(products);
        renderUpdatedProducts();
    }

}

const productsStart = [
    {
        id: "550e8400-e29b-41d4-a716-446655440000",
        name: "Греча от мироторг",
        photo: null,

        quantity: {
            value: 800,
            unit: "грамм",
            type: "Масса",

            normalizedValue: 800,
            normalizedUnit: "g"
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
            type: "Масса",

            normalizedValue: 600,
            normalizedUnit: "g"
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
            type: "Масса",

            normalizedValue: 50,
            normalizedUnit: "g"
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
            type: "Масса",

            normalizedValue: 680,
            normalizedUnit: "g"
        },

        price: 520,

        createdAt: Date.now()
    }
];


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

