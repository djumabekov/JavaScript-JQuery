/*
1. В одномерном массиве, состоящем из N вещественных чисел
вычислить произведение элементов, находящихся между min и max
элементами.
 */

console.log("\n\n1. В одномерном массиве, состоящем из N вещественных чисел " 
            + " вычислить произведение элементов, находящихся между min и max элементами.");

let size = prompt("Введите количество элементов"); 

// заполняем массив 
let arr = new Array();
for(let i=0; i<size; i++){
    let random = (Math.random() * size).toFixed(1);
    arr.push(+random);
    console.log(arr[i]);
}
// определяем макс и мин элементы в массиве 
let max = Math.max.apply(null,arr);
let min = Math.min.apply(null,arr);

// определяем диапазон массива для суммирования элементов
let indexStart = Math.min(arr.indexOf(max), arr.indexOf(min));
let indexEnd = Math.max(arr.indexOf(max), arr.indexOf(min));

// вычисляем сумму
let sum = 0;
for (let i = indexStart; i <= indexEnd; i++) {
    sum+=arr[i];
}
console.log("Мин.элемент = " + min +", Макс.элемент = " + max);
console.log("Сумма между ними = " + sum.toFixed(1));

/*
2. Пользователь вводит прибыль фирмы за год (12 месяцев). Затем 
пользователь вводит диапазон (например, 3 и 6 – поиск между 3-м и
6-м месяцем). Необходимо определить месяц, в котором прибыль
была максимальна и месяц, в котором прибыль была минимальна с
учетом выбранного диапазона.
*/


console.log("\n\n2. Пользователь вводит прибыль фирмы за год (12 месяцев). Затем  " 
            + " пользователь вводит диапазон (например, 3 и 6 – поиск между 3-м и"
            + " 6-м месяцем). Необходимо определить месяц, в котором прибыль"
            + " была максимальна и месяц, в котором прибыль была минимальна с"
            + " учетом выбранного диапазона."
            );

let arrived = prompt("Введите прибыль фирмы за год (12 месяцев)"); 

// заполняем массив 
let arrivedInYear = new Array();
for(let i=0; i<12; i++){
    let random = (Math.random() * arrived/12).toFixed(1);
    arrivedInYear.push(+random);
    console.log(i+1 + ") " + arrivedInYear[i]);
}

let startMonth = prompt("Введите начальный месяц"); 
let endMonth = prompt("Введите конечный месяц"); 

//вырезаем во временный массив заданный диапазон значений
let tempArr = arrivedInYear.slice(startMonth-1, endMonth);

// опеределяем максимальное значение во временном массиве
let maxArived = Math.max.apply(null,tempArr);

console.log("Максимальная прибыль в диапазоне " + startMonth + " и " + endMonth + " месяцев = " + maxArived);


/*
3. Написать программу, выполняющую сортировку одномерного
массива целых чисел.Напишите программу, которая суммирует
элементы массива из 10 элементов по следующему принципу:
первый суммирует с последним; второй – с предпоследним и т.д. И
заносит сумму в массив из 5 элементов.
*/

console.log("\n\n3. Написать программу, выполняющую сортировку одномерного  " 
            + " массива целых чисел.Напишите программу, которая суммирует"
            + " элементы массива из 10 элементов по следующему принципу:"
            + " первый суммирует с последним; второй – с предпоследним и т.д. И"
            + " заносит сумму в массив из 5 элементов."
            );

let arrTenNums = [];
let arrFiveNums = [];
for(let i=0; i<10; i++){
    let random = Math.round(Math.random() * 10)
    arrTenNums.push(random);
}
console.log(arrTenNums);

for(let i=0; i<5; i++){
    arrFiveNums.push(arrTenNums[i]+arrTenNums[10-1-i])
}
console.log(arrFiveNums);

/*
4. Число называется совершенным, если сумма всех его делителей
равна ему самому. Напишите функцию поиска таких чисел во
введенном интервале.
 */

console.log("\n\n4. Число называется совершенным, если сумма всех его делителей " 
            + " равна ему самому. Напишите функцию поиска таких чисел во"
            + " введенном интервале."
            );

let startNum = prompt("Введите начальное число"); 
let endNum = prompt("Введите конечное число"); 

for (let i = startNum; i<endNum; i++){
    let result = 0;
    for (let j = 1; j<i; j++){
        if ((i%j) == 0){
            result += j;
        }
    }
    if (result == i && result){
        console.log(result);
    }
}

/*
5. Написать функцию, которая принимает три числа и показывает на
экран все числа от 0 до 1000, которые одновременно кратны всем
трем параметрам. Проиллюстрировать работу этой функции.
*/

console.log("\n\n5. Написать функцию, которая принимает три числа и показывает на " 
            + " экран все числа от 0 до 1000, которые одновременно кратны всем "
            + " трем параметрам. Проиллюстрировать работу этой функции."
            );

function foo(a, b, c) {
    for (let i = 0; i <= 1000; ++i) {
        if (i % a == 0 && i % b == 0 && i % c == 0){
            console.log(i);
        }
    }
}

foo(2, 222, 666);