//получаем массив input
let inputs = document.getElementsByTagName("input");

// парсим полученную строку из localStorage в переменную user
let user = JSON.parse(localStorage.getItem("user"));

console.log(user);

// присваеваем значениям input параметры из объекта user
inputs[0].value = user.name;
inputs[1].value = user.password;
inputs[2].value = user.fullName;


