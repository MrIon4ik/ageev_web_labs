const soupsContainer = document.getElementById("soups");
const mainDishesContainer = document.getElementById("main-dishes");
const drinksContainer = document.getElementById("drinks");

const emptyOrder = document.getElementById("empty-order");

const soupOrder = document.getElementById("soup-order");
const mainOrder = document.getElementById("main-order");
const drinkOrder = document.getElementById("drink-order");

const selectedSoup = document.getElementById("selected-soup");
const selectedMain = document.getElementById("selected-main");
const selectedDrink = document.getElementById("selected-drink");

const soupPrice = document.getElementById("soup-price");
const mainPrice = document.getElementById("main-price");
const drinkPrice = document.getElementById("drink-price");

const totalPrice = document.getElementById("total-price");
const total = document.getElementById("total");

// Выбранные блюда

let selected = {
    soup: null,
    main: null,
    drink: null
};


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


// Отображение блюд

function displayDishes() {

    const sortedDishes = [...dishes].sort(function (a, b) {

        return a.name.localeCompare(b.name);

    });


    sortedDishes.forEach(function (dish) {

        const card = createDishCard(dish);


        if (dish.category === "soup") {

            soupsContainer.appendChild(card);

        }

        if (dish.category === "main") {

            mainDishesContainer.appendChild(card);

        }

        if (dish.category === "drink") {

            drinksContainer.appendChild(card);

        }

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

    const hasSoup = selected.soup !== null;
    const hasMain = selected.main !== null;
    const hasDrink = selected.drink !== null;

    const hasAnyDish = hasSoup || hasMain || hasDrink;


    // Если ничего не выбрано

    if (!hasAnyDish) {

        emptyOrder.style.display = "block";

        soupOrder.style.display = "none";
        mainOrder.style.display = "none";
        drinkOrder.style.display = "none";

        totalPrice.style.display = "none";

        return;
    }


    emptyOrder.style.display = "none";


    // Суп

    if (hasSoup) {

        soupOrder.style.display = "block";

        selectedSoup.textContent = selected.soup.name;
        soupPrice.textContent = selected.soup.price + "₽";

    } else {

        soupOrder.style.display = "block";

        selectedSoup.textContent = "Блюдо не выбрано";
        soupPrice.textContent = "";

    }


    // Главное блюдо

    if (hasMain) {

        mainOrder.style.display = "block";

        selectedMain.textContent = selected.main.name;
        mainPrice.textContent = selected.main.price + "₽";

    } else {

        mainOrder.style.display = "block";

        selectedMain.textContent = "Блюдо не выбрано";
        mainPrice.textContent = "";

    }


    // Напиток

    if (hasDrink) {

        drinkOrder.style.display = "block";

        selectedDrink.textContent = selected.drink.name;
        drinkPrice.textContent = selected.drink.price + "₽";

    } else {

        drinkOrder.style.display = "block";

        selectedDrink.textContent = "Напиток не выбран";
        drinkPrice.textContent = "";

    }


    // Стоимость заказа

    let sum = 0;


    if (hasSoup) {
        sum += selected.soup.price;
    }

    if (hasMain) {
        sum += selected.main.price;
    }

    if (hasDrink) {
        sum += selected.drink.price;
    }


    total.textContent = sum + "₽";

    totalPrice.style.display = "flex";

}


// Сброс заказа

const form = document.querySelector("form");


form.addEventListener("reset", function () {

    setTimeout(function () {

        selected.soup = null;
        selected.main = null;
        selected.drink = null;

        updateOrder();

    }, 0);

});

displayDishes();

updateOrder();