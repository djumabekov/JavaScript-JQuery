
// получаем с localStorage значение флажка об успешной авторизации
let authSuccess = localStorage.getItem('authSuccess'); 
// если значение флажка об успешной авторизации == false, то переводим пользователя на главную страницу авторизации
if(!authSuccess){
    userMessage.innerHTML = "Вы не авторизованы!";
    setTimeout(location.href = "index.html", 2000); // переводим пользователя на главную страницу
} 

// если значение флажка об успешной авторизации == true, то оставляем на текущей странице 
else{
    userMessage.innerHTML = "Вы успешно авторизованы!";
}

// функция отрисовки продуктов на главной странице
const drawProduct = (product) =>
{
    let productsBlock = document.querySelector("#products_block");
    productsBlock.innerHTML += 
        `<div class="product">
            <h3> ${product.name } </h3>
            <p>  ${product.price} </p>
        </div>
        `;
}

// массив объектов продуктов
let products = [
    {
        name: "Milk",
        price: 300,
    },
    {
        name: "Bred",
        price: 150,
    },
    {
        name: "Tea",
        price: 600,
    },
    {
        name: "Eggs",
        price: 1000,
    },
];

// цикл отрисовки продуктов на главной странице
for(let i=0; i<products.length; i++){
    drawProduct(products[i]);
}

// функция добавления продукта в корзину при нажатии на него через событие addEventListener
let productBlocks = document.querySelectorAll(".product");
// console.log(productBlocks);
for(let i=0; i<productBlocks.length; i++){
    productBlocks[i].addEventListener('click', ()=>{
        let productName = productBlocks[i].children[0].innerHTML;
        let productPrice = productBlocks[i].children[1].innerHTML;
        let productObject = {
            id: i,
            name: productName,
            price: productPrice,
        }
        console.log(productObject);
        // подтягиваем массив элементов корзины с localStorage
        let cartArray = JSON.parse(localStorage.getItem("cartArray"));
        console.log("cartArray = " + cartArray);
        if(cartArray === null){ //если JSON возвращает null 
            cartArray = [];     //то создаем пустой массив корзины
        }
        cartArray.push(productObject); // добавляем продукт в массив корзины
        localStorage.setItem('cartArray', JSON.stringify(cartArray)); // записываем массив корзины в localStorage
    })
}

