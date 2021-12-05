const products = [
    { id: 1, title: 'Notebook', price: 2000 },
    { id: 2, title: 'Mouse', price: 20 },
    { id: 3, title: 'Keyboard', price: 200 },
    { id: 4, title: 'Gamepad', price: 50 },
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (item) => {
    return `<div class="product-item">
                <img class="product-item__photo" src="img/for_women.jpg" alt="${item.title}">
                <h3 class="product-item__title">${item.title}</h3>
                <p class="product-item__price">${item.price}</p>
                <button class="product-item__buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList.join(''); // Т.к. productsList является массивом, то при его выводе по умолчанию элементы разделяются запятой, чтобы это устранить можно воспользоваться методом join и в качестве разделителя присоить пустую строку
};

renderPage(products);
