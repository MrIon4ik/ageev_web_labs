const dishes = [

    // Супы

    {
        keyword: "gazpacho",
        name: "Гаспачо",
        price: 195,
        category: "soup",
        count: "350 г",
        image: "images/gazpacho.png",
        kind: "veg"
    },

    {
        keyword: "mushroom-soup",
        name: "Грибной суп-пюре",
        price: 185,
        category: "soup",
        count: "330 г",
        image: "images/mushroom-soup.png",
        kind: "veg"
    },

    {
        keyword: "norwegian-soup",
        name: "Норвежский суп",
        price: 270,
        category: "soup",
        count: "330 г",
        image: "images/norwegian-soup.png",
        kind: "fish"
    },

    {
        keyword: "tom-yam",
        name: "Том ям с креветками",
        price: 650,
        category: "soup",
        count: "500 г",
        image: "images/tom-yam.png",
        kind: "fish"
    },

    {
        keyword: "ramen",
        name: "Рамен",
        price: 375,
        category: "soup",
        count: "425 г",
        image: "images/ramen.png",
        kind: "meat"
    },

    {
        keyword: "chicken-soup",
        name: "Куриный суп",
        price: 330,
        category: "soup",
        count: "350 г",
        image: "images/chicken-soup.png",
        kind: "meat"
    },


    // Главные блюда

    {
        keyword: "potatoes",
        name: "Жареная картошка с грибами",
        price: 150,
        category: "main",
        count: "250 г",
        image: "images/potatoes.png",
        kind: "veg"
    },

    {
        keyword: "pizza-margherita",
        name: "Пицца Маргарита",
        price: 450,
        category: "main",
        count: "470 г",
        image: "images/pizza-margherita.png",
        kind: "veg"
    },

    {
        keyword: "lasagna",
        name: "Лазанья",
        price: 385,
        category: "main",
        count: "310 г",
        image: "images/lasagna.png",
        kind: "meat"
    },

    {
        keyword: "chicken-cutlets",
        name: "Котлеты из курицы с картофельным пюре",
        price: 225,
        category: "main",
        count: "280 г",
        image: "images/chicken-cutlets.png",
        kind: "meat"
    },

    {
        keyword: "fish-cutlet",
        name: "Рыбная котлета с рисом и спаржей",
        price: 320,
        category: "main",
        count: "270 г",
        image: "images/fish-cutlet.png",
        kind: "fish"
    },

    {
        keyword: "shrimp-pasta",
        name: "Паста с креветками",
        price: 340,
        category: "main",
        count: "280 г",
        image: "images/shrimp-pasta.png",
        kind: "fish"
    },


    // Салаты и стартеры

    {
        keyword: "korean-salad",
        name: "Корейский салат с овощами и яйцом",
        price: 330,
        category: "salad",
        count: "250 г",
        image: "images/korean-salad.png",
        kind: "veg"
    },

    {
        keyword: "caprese",
        name: "Капрезе с моцареллой",
        price: 350,
        category: "salad",
        count: "235 г",
        image: "images/caprese.png",
        kind: "veg"
    },

    {
        keyword: "fries-caesar",
        name: "Картофель фри с соусом Цезарь",
        price: 280,
        category: "salad",
        count: "235 г",
        image: "images/fries-caesar.png",
        kind: "veg"
    },

    {
        keyword: "fries-ketchup",
        name: "Картофель фри с кетчупом",
        price: 260,
        category: "salad",
        count: "235 г",
        image: "images/fries-ketchup.png",
        kind: "veg"
    },

    {
        keyword: "caesar-chicken",
        name: "Цезарь с цыпленком",
        price: 370,
        category: "salad",
        count: "220 г",
        image: "images/caesar-chicken.png",
        kind: "meat"
    },

    {
        keyword: "tuna-salad",
        name: "Салат с тунцом",
        price: 480,
        category: "salad",
        count: "250 г",
        image: "images/tuna-salad.png",
        kind: "fish"
    },


    // Напитки

    {
        keyword: "orange-juice",
        name: "Апельсиновый сок",
        price: 120,
        category: "drink",
        count: "300 мл",
        image: "images/orange-juice.png",
        kind: "cold"
    },

    {
        keyword: "apple-juice",
        name: "Яблочный сок",
        price: 90,
        category: "drink",
        count: "300 мл",
        image: "images/apple-juice.png",
        kind: "cold"
    },

    {
        keyword: "carrot-juice",
        name: "Морковный сок",
        price: 110,
        category: "drink",
        count: "300 мл",
        image: "images/carrot-juice.png",
        kind: "cold"
    },

    {
        keyword: "cappuccino",
        name: "Капучино",
        price: 180,
        category: "drink",
        count: "300 мл",
        image: "images/cappuccino.png",
        kind: "hot"
    },

    {
        keyword: "green-tea",
        name: "Зеленый чай",
        price: 100,
        category: "drink",
        count: "300 мл",
        image: "images/green-tea.png",
        kind: "hot"
    },

    {
        keyword: "black-tea",
        name: "Черный чай",
        price: 90,
        category: "drink",
        count: "300 мл",
        image: "images/black-tea.png",
        kind: "hot"
    },


    // Десерты

    {
        keyword: "cheesecake",
        name: "Чизкейк",
        price: 240,
        category: "dessert",
        count: "125 гр",
        image: "images/cheesecake.png",
        kind: "small"
    },

    {
        keyword: "chocolate-cheesecake",
        name: "Шоколадный чизкейк",
        price: 260,
        category: "dessert",
        count: "125 гр",
        image: "images/chocolate-cheesecake.png",
        kind: "small"
    },

    {
        keyword: "chocolate-cake",
        name: "Шоколадный торт",
        price: 270,
        category: "dessert",
        count: "140 гр",
        image: "images/chocolate-cake.png",
        kind: "small"
    },

    {
        keyword: "baklava",
        name: "Пахлава",
        price: 220,
        category: "dessert",
        count: "300 гр",
        image: "images/baklava.png",
        kind: "medium"
    },

    {
        keyword: "donuts-3",
        name: "Пончики (3 штуки)",
        price: 410,
        category: "dessert",
        count: "350 гр",
        image: "images/donuts-3.png",
        kind: "medium"
    },

    {
        keyword: "donuts-6",
        name: "Пончики (6 штук)",
        price: 650,
        category: "dessert",
        count: "700 гр",
        image: "images/donuts-6.png",
        kind: "large"
    }

];
