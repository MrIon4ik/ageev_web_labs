const categories = ["soup", "main", "salad", "drink", "dessert"];

const containers = {
    soup: document.getElementById("soups"),
    main: document.getElementById("main-dishes"),
    salad: document.getElementById("salads"),
    drink: document.getElementById("drinks"),
    dessert: document.getElementById("desserts")
};


// Строки в блоке «Ваш заказ»

const orderRows = {

    soup: {
        block: document.getElementById("soup-order"),
        name: document.getElementById("selected-soup"),
        price: document.getElementById("soup-price"),
        empty: "Блюдо не выбрано"
    },

    main: {
        block: document.getElementById("main-order"),
        name: document.getElementById("selected-main"),
        price: document.getElementById("main-price"),
        empty: "Блюдо не выбрано"
    },

    salad: {
        block: document.getElementById("salad-order"),
        name: document.getElementById("selected-salad"),
        price: document.getElementById("salad-price"),
        empty: "Блюдо не выбрано"
    },

    drink: {
        block: document.getElementById("drink-order"),
        name: document.getElementById("selected-drink"),
        price: document.getElementById("drink-price"),
        empty: "Напиток не выбран"
    },

    dessert: {
        block: document.getElementById("dessert-order"),
        name: document.getElementById("selected-dessert"),
        price: document.getElementById("dessert-price"),
        empty: "Блюдо не выбрано"
    }

};


const emptyOrder = document.getElementById("empty-order");

const totalPrice = document.getElementById("total-price");
const total = document.getElementById("total");


// Выбранные блюда

let selected = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    dessert: null
};


// Выбранный фильтр в каждой категории

let activeFilters = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    dessert: null
};


// Создание карточки блюда

function createDishCard(dish) {

    const card = document.createElement("div");

    card.classList.add("dish");

    card.dataset.dish = dish.keyword;


    const image = document.createElement("img");

    image.src = dish.image;
    image.alt = dish.name;


    const price = document.createElement("p");

    price.textContent = dish.price + "₽";


    const name = document.createElement("p");

    name.textContent = dish.name;


    const count = document.createElement("p");

    count.textContent = dish.count;


    const button = document.createElement("button");

    button.type = "button";
    button.textContent = "Добавить";


    card.appendChild(image);
    card.appendChild(price);
    card.appendChild(name);
    card.appendChild(count);
    card.appendChild(button);


    card.addEventListener("click", function () {

        selectDish(card.dataset.dish);

    });


    return card;
}


// Отображение блюд одной категории с учетом выбранного фильтра

function displayCategory(category) {

    const container = containers[category];

    const kind = activeFilters[category];


    container.innerHTML = "";


    const categoryDishes = dishes.filter(function (dish) {

        if (dish.category !== category) {
            return false;
        }

        // Если фильтр не выбран, показываем все блюда категории

        if (kind === null) {
            return true;
        }

        return dish.kind === kind;

    });


    categoryDishes.sort(function (a, b) {

        return a.name.localeCompare(b.name);

    });


    categoryDishes.forEach(function (dish) {

        container.appendChild(createDishCard(dish));

    });

}


// Отображение блюд всех категорий

function displayDishes() {

    categories.forEach(function (category) {

        displayCategory(category);

    });

}


// Фильтры

function setupFilters() {

    const filterBlocks = document.querySelectorAll(".filters");

    filterBlocks.forEach(function (block) {

        const category = block.dataset.category;
        const buttons = block.querySelectorAll(".filter-button");

        buttons.forEach(function (button) {

            button.addEventListener("click", function () {

                const kind = button.dataset.kind;

                // Повторный клик по выбранному фильтру сбрасывает его

                if (activeFilters[category] === kind) {

                    activeFilters[category] = null;

                } else {

                    activeFilters[category] = kind;

                }

                buttons.forEach(function (item) {

                    item.classList.remove("active");

                });


                if (activeFilters[category] !== null) {

                    button.classList.add("active");

                }


                displayCategory(category);

            });

        });

    });

}


// Выбор блюда

function selectDish(keyword) {

    const dish = dishes.find(function (item) {

        return item.keyword === keyword;

    });


    if (!dish) {
        return;
    }


    selected[dish.category] = dish;


    updateOrder();

}


// Обновление заказа

function updateOrder() {

    const hasAnyDish = categories.some(function (category) {

        return selected[category] !== null;

    });

    if (!hasAnyDish) {

        emptyOrder.style.display = "block";

        categories.forEach(function (category) {

            orderRows[category].block.style.display = "none";

        });

        totalPrice.style.display = "none";

        return;
    }


    emptyOrder.style.display = "none";


    let sum = 0;


    categories.forEach(function (category) {

        const row = orderRows[category];
        const dish = selected[category];


        row.block.style.display = "block";


        if (dish) {

            row.name.textContent = dish.name;
            row.price.textContent = dish.price + "₽";

            sum += dish.price;

        } else {

            row.name.textContent = row.empty;
            row.price.textContent = "";

        }

    });


    // Стоимость заказа

    total.textContent = sum + "₽";

    totalPrice.style.display = "flex";

}


// Сброс заказа

const form = document.querySelector("form");


form.addEventListener("reset", function () {

    setTimeout(function () {

        categories.forEach(function (category) {

            selected[category] = null;

        });

        updateOrder();

    }, 0);

});


setupFilters();

displayDishes();

updateOrder();