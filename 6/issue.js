
// получаем массив элементов в корзине из localStorage
let cartArray = JSON.parse(localStorage.getItem("cartArray"));

//переменная хранящая итоговой цены
let totalPrice = 0;

// отрисовываем табличку с товарами и ценой
let productsBlock = document.querySelector("#products_block");
productsBlock.innerHTML = 
    `<table width="300px" border-collapse = "collapse" border="1 solid black">
            <tr>
                <td width="100px"><b>Наименование</b></td>
                <td width="100px"> <b>Цена</b></td>
            </tr>
    </table>
    `;
const drawProduct = (product) =>
{
    productsBlock.innerHTML += 
            `<table width="300px" border-collapse = "collapse" border="1 solid black">
                <tr >
                    <td width="150px"> ${product.name } </td>
                    <td width="150px">  ${product.price} </td>
                </tr>
            </table>
            `;
    totalPrice += +product.price;
    console.log("totalPrice = " + totalPrice);
}

// в цикле перебираем массив элементов корзины и вызываем для них функцию отрисовки drawProduct()
if(cartArray !== null){
    for(let i=0; i<cartArray.length; i++){
        drawProduct(cartArray[i]);
    }
}

// дорисоваем конец таблички с итоговой ценой
productsBlock.innerHTML += 
    `<table width="300px" border-collapse = "collapse" border="1 solid black">
        <tr>
            <td width="150px"> <b>Итоговая цена:</b> </td>
            <td width="150px"><b>${totalPrice} </b></td>
        </tr>
    </table>
    `;