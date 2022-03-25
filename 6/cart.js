//функция отрисовки продуктов в корзине в HTML
const drawProduct = (product) =>
{
    let productsBlock = document.querySelector("#products_block");
    productsBlock.innerHTML += 
        `<div class="product" style="padding:10px">
            <h3> ${product.name } </h3>
            <p>  ${product.price} </p>
            <button class="delItemButton">Удалить</button>
        </div>
        `;
}

//получаем массив элементов в корзине из localStorage
let cartArray = JSON.parse(localStorage.getItem("cartArray"));
console.log("cartArray = " + cartArray);

//если массив элементов в корзине не пустой от отрисовываем корзину функцией drawProduct()
if(cartArray !== null){
    for(let i=0; i<cartArray.length; i++){
        drawProduct(cartArray[i]);
    }
}

// кнопка отчистки всей корзины в localStorage 
let clearButton = document.getElementById("clearCart");
clearButton.addEventListener('click', ()=>{
    localStorage.removeItem("cartArray");
    location.reload();
})

// функция отчистки одного элемента из корзины в localStorage при нажатии кнопки "удалить"
let delItemButtons = document.getElementsByClassName("delItemButton");
for(let i=0; i<delItemButtons.length; i++){
    delItemButtons[i].addEventListener('click', ()=>{
        console.log(delItemButtons[i]);
        cartArray.splice(i-1, 1); // вырезаем элемент из массива корзины
        localStorage.setItem('cartArray', JSON.stringify(cartArray)); // перезаписываем массив в localStorage
        location.reload(); 
    })
}

//Удаляем первый элемент корзины
let delFirstButton = document.getElementById("delFirst");
delFirstButton.addEventListener('click', ()=>{
    console.log(delFirstButton);
    cartArray.shift(); // функция удаления первого элемента массива
    localStorage.setItem('cartArray', JSON.stringify(cartArray));
    location.reload();
})

//Удаляем второй элемент корзины
let delSecondButton = document.getElementById("delSecond");
delSecondButton.addEventListener('click', ()=>{
    console.log(delSecondButton);
    if(cartArray.length > 1){
        cartArray.splice(1,1); // функция удаления второго элемента массива
        localStorage.setItem('cartArray', JSON.stringify(cartArray));
        location.reload();
    }
})

//Удаляем первые 4 элемента
let delFirstFourButton = document.getElementById("delFirstFour");
delFirstFourButton.addEventListener('click', ()=>{
    console.log(delFirstFourButton);
    if(cartArray.length > 3){
        cartArray.splice(0,4); // функция удаления с 1 по 4 элемент массива
        localStorage.setItem('cartArray', JSON.stringify(cartArray));
        location.reload();
    }
})

//Удаляем последние 4 элемента
let delLastFourButton = document.getElementById("delLastFour");
delLastFourButton.addEventListener('click', ()=>{
    console.log(delLastFourButton);
    if(cartArray.length > 3){
        let size = cartArray.length;
        for(let i=size; i>size-4; i--){ 
            cartArray.pop(); // функция удаления последнего элемента массива
        }
    localStorage.setItem('cartArray', JSON.stringify(cartArray));
    location.reload();
    }
})

// кнопка перехода на страницу оформления заказа issue.html
let issueButtons = document.getElementById("issueCart");
issueButtons.addEventListener('click', ()=>{
    location.href = "issue.html";
})