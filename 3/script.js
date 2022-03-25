/**
 * 1. Создать класс Laptop. Должны быть поля model, cpuName, ram,
price. Конструктор должен принимать значения для всех полей.
Нужно создать метод makeSale, которая принимает
процент(number), и делает этот ноутбук дешевле на этот процент.
Реализовать инкапсуляцию. Затем, нужно создать объект этого
класса и показать, как отработает функция makeSale.
 */

console.log("\n\n1. Создать класс Laptop. Должны быть поля model, cpuName, ram,  " 
            + " price. Конструктор должен принимать значения для всех полей. "
            + " Нужно создать метод makeSale, которая принимает "
            + " процент(number), и делает этот ноутбук дешевле на этот процент. "
            + " Реализовать инкапсуляцию. Затем, нужно создать объект этого "
            + " класса и показать, как отработает функция makeSale. "
            );

class Laptop{
    #model;
    #cpuName;
    #ram;
    #price;
    constructor(model, cpuName, ram, price){
        this.#model = model;
        this.#cpuName = cpuName;
        this.#ram = ram;
        this.#price = price;
    }

    get price(){
        return this.#price;
    }

    makeSale(discount){
        this.#price -= this.#price * (discount / 100);
    }
}

let laptop = new Laptop("HP", "Intel Core i7", "6GB", 300000);
console.log(laptop);

let discount = 30;
laptop.makeSale(discount);
console.log(`After discount ${discount}% price = ${laptop.price}`);