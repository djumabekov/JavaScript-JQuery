
/**
 * 1. Нужно создать 2 блока с классом «title». Содержимое первого блока
        нужно подчеркнуть, а второго блока нужно сделать курсивным.
 */

let titles = document.getElementsByClassName("title");

titles[0].style.textDecoration = "underline";
titles[1].style.fontStyle = "italic";

/**
 * 2. Создать один квадратный блок 100х100px и 4 кнопки с текстом
        «Черный», «Зеленый», «Красный» и «Желтый». При нажатии на каждую
        из кнопок, задний фон блока должен перекрашиваться в нужный цвет.
 */

// получаем массив кнопок
let buttons = document.getElementsByTagName("button");

// получаем ссылку на квадрат
let square = document.getElementById("square");

// каждому элементу массива кнопок устанавливаем событие на нажатие при котором 
// меняем цвет фона квадрата в соответствии со значением id кнопки
for(let i=0; i<buttons.length; i++){
    buttons[i].addEventListener('click', ()=>{
        square.style.backgroundColor =  buttons[i].id;
    })
}