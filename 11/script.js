// поле ввода названия товара
let productName = document.getElementById("productName");
// поле ввода цены покупки
let purshasePrice = document.getElementById("purshasePrice");
// поле ввода цены продажи
let sellPrice = document.getElementById("sellPrice");
// поле ввода количества товара
let productCount = document.getElementById("productCount");
// кнопка добавления товара на склад
let addProductToWarehouseBtn = document.getElementById("addProductToWarehouseBtn");
// блок для вывода списка товаров
let itemsList = document.getElementById("productsList");
// блок для вывода логов операций
let logList = document.getElementById("logList");
// кнопка удаления товара
let deleteProduct = document.getElementsByClassName("deleteProduct");
// кнопка продажи товара
let sellProduct = document.getElementsByClassName("sellProduct");
// блок вывода информации по сумме денег
let warehouseStat = document.getElementById("warehouseStat");
// поле ввода для зачисления денег
let money = document.getElementById("money");
// кнопка зачисления денег
let addMoney = document.getElementById("addMoney");


//класс "Склад"
class Warehouse{
    #items; // массив товаров
    #cash; // сумма денег
    #item; // объект товар
    #logs; // массив логов
    #log; // объект лог

    // конструктор
    constructor(cash=0, items=[], logs=[]){
        this.#items = items
        this.#cash = cash;
        this.#logs = logs;
        this.#item = {
            name : "", 
            pPrice : 0, 
            sPrice : 0, 
            count : 0,
        }
        this.#log = {
            name : "", 
            operation : "", 
            date : "", 
        }
    }

    // метод определяющий добавление (при отсутствии) или обновление информации (при наличии) о товаре
    setItem(obj){
        if(Number(obj.pPrice)*Number(obj.count) > Number(this.#cash)){
            alert("Недостаточно средств. Пополните баланс.");
            return;
        }
        console.log(obj);
        let index = this.#items.findIndex(item => item.name == obj.name);
        console.log(index);
        (index < 0) ? this.pushItem(obj) : this.updateItem(obj, index);
    }

    // метод обновления информации о товаре
    updateItem(obj, index){
        this.#items[index].pPrice = obj.pPrice;
        this.#items[index].sPrice = obj.sPrice;
        this.#items[index].count =  Number(this.#items[index].count) + Number(obj.count);
        this.#cash = this.#cash - obj.pPrice;
        let now = new Date().toLocaleString();
        console.log(now);
        this.logger(this.#items[index].name, "item update", now);
        this.addToLocalstorage(this.#logs, this.#items, this.#cash);
    }

    // метод добавления товара
    pushItem(obj){
        this.#items.push(obj);
        this.#cash = this.#cash - obj.pPrice;
        let now = new Date().toLocaleString();
        this.logger(obj.name, "item added", now);
        this.addToLocalstorage(this.#logs, this.#items, this.#cash);
    }

    // метод удаления товара
    removeItem(index){
        let now = new Date().toLocaleString();
        this.logger(this.#items[index].name, "item remove", now);
        if(this.#items.length > 0){
            this.#items.splice(index, 1);
            this.addToLocalstorage(this.#logs, this.#items);
        }
    }

    // метод продажи товара
    sellItem(name, count){
        let index = this.#items.findIndex(item => item.name == name);
        if(index < 0){
            return "Товар не найден!";
        }
        if(this.#items[index].count < count){
            return "Недостаточное количества товара на складе";
        }
        this.#items[index].count =  this.#items[index].count - count;
        this.#cash = Number(this.#cash) + Number((this.#items[index].sPrice * count));
        let now = new Date().toLocaleString();
        this.logger(this.#items[index].name, "item sell", now);
        this.addToLocalstorage(this.#logs, this.#items, this.#cash);
        return `Вы продали ${name} в количестве ${count} штук на сумму $${this.#items[index].sPrice * count}`;
    }

    // метод добавления массива товаров, суммы, логов в Локалсторэдж
    addToLocalstorage(log, items=this.#items, cash=this.#cash){
        localStorage.setItem('items', JSON.stringify(items));
        localStorage.setItem('cash', cash);
        localStorage.setItem('log', JSON.stringify(log));
    }
    // метод чтения массива товаров, суммы, логов из Локалсторэдж
    readFromLocalstorage(){
        let itemsParse = JSON.parse(localStorage.getItem("items"));
        let logsParse = JSON.parse(localStorage.getItem("log"));
        let cashParse = localStorage.getItem("cash");
        if(itemsParse !== null){
            this.#items = itemsParse;
        }
        if(logsParse !== null){
            this.#logs = logsParse;
        }
        if(cashParse !== null){
            this.#cash = cashParse;
        }

    }

      
    // метод логирования операций 
    logger(name, operation, date){
        let log = {
            name: name,
            operation: operation,
            date: date,
        }
        this.#logs.push(log);

    }

    // метод вывода статистики, перечня товаров и логов
    showItems(){
        itemsList.innerHTML = '';
        warehouseStat.innerHTML = `
        <p><b>Общая сумма денег на складе:</b> $${this.#cash}</p>`;

        if(this.#items.length > 0){
            let maxCount = this.#items.reduce((acc, curr) => acc.count > curr.count ? acc : curr);
            let minCount = this.#items.reduce((acc, curr) => acc.count < curr.count ? acc : curr);
            let maxExpensive = this.#items.reduce((acc, curr) => acc.pPrice > curr.pPrice ? acc : curr);
            let minExpensive = this.#items.reduce((acc, curr) => acc.pPrice < curr.pPrice ? acc : curr);
            warehouseStat.innerHTML += `
            <p><b>Количество товаров:</b> ${this.#items.length}</p>
            <p><b>На складе больше всего товара:</b> ${maxCount.name} (${maxCount.count} штук)</p>
            <p><b>На складе меньше всего товара:</b> ${minCount.name} (${minCount.count} штук)</p>
            <p><b>Cамый дорогой товар:</b> ${maxExpensive.name} ($${maxExpensive.pPrice})</p>
            <p><b>Самый дешевый товар:</b> ${minExpensive.name} ($${minExpensive.pPrice})</p>
            `;
        }
        for(let i=0; i<this.#items.length; i++){
            this.drawProduct(this.#items[i], i);
        }
        console.log("this.#logs.length = " + this.#logs.length);
        logList.innerHTML = '';
        for(let i=0; i<this.#logs.length; i++){
            this.drawLogs(this.#logs[i], i);
        }
    }

    // метод отрисовки массива товаров
    drawProduct(item, index){
        itemsList.innerHTML += 
        `<table width="1200px" border-collapse = "collapse" border="1 solid black">
            <tr>
                <td width="200px">${item.name}</td>
                <td width="200px">${item.pPrice}</td>
                <td width="200px">${item.sPrice}</td>
                <td width="200px">${item.count}</td>
                <td width="200px"><input type="button" class="deleteItem" onclick="deleteItemFromWarehouse(${index})" value="Удалить товар со склада">
                <td width="200px"><input type="button" class="sellItem" onclick="sellItemFromWarehouse('${item.name}')" value="Продать товар со склада">
                </td>
            </tr>
            </table>
        `;
    }
    
    // метод отрисовки массива логов
    drawLogs(log, index){
        logList.innerHTML += 
        `<table width="700px" border-collapse = "collapse" border="1 solid black">
            <tr>
                <td width="100px">${index}</td>
                <td width="200px">${log.name}</td>
                <td width="200px">${log.operation}</td>
                <td width="200px">${log.date}</td>
            </tr>
        </table>
        `;
    }

    // геттер определенного товара из массива товаров
    getItem(index){
        return this.#items[index];
    }
    // геттер массива товаров
    getItems(){
        return this.#items;
    }
    // сеттер добавления денег
    setCash(cash){
        this.#cash = Number(this.#cash) + Number(cash);
        let now = new Date().toLocaleString();
        this.logger(cash, "money added", now);
        this.addToLocalstorage(this.#logs);
    }
    // геттер денег
    getCash(){
        return this.#cash;
    }
};


let wh = new Warehouse(1000);
wh.readFromLocalstorage();
wh.showItems();

addProductToWarehouseBtn.addEventListener('click', ()=>{
    let item = {
        name : productName.value,
        pPrice : purshasePrice.value,
        sPrice : sellPrice.value,
        count : productCount.value,
    }
    wh.setItem(item);
    wh.showItems();
    console.log(wh.getItems());
    console.log(wh.getCash());
})

let deleteItemFromWarehouse = function(index){
    wh.removeItem(index);
    wh.showItems();
}

let sellItemFromWarehouse = function(name){
    console.log("name = "+name);
    let count = prompt("Введите количество товара");
    let message = wh.sellItem(name, count);
    alert(message);
    wh.showItems();
}

addMoney.addEventListener('click', ()=>{
    wh.setCash(Math.abs(money.value));
    wh.showItems();
})