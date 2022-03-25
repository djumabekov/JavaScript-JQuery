//получаем массив input
let inputs = document.getElementsByTagName("input");

//получаем кнопку
let nextButton = document.getElementById("next_btn");

//устанавливаем на кнопку событие при нажатии которого формируем объект user
// в который записываем параметры 
nextButton.addEventListener('click', ()=>{
    let user = {
        name: inputs[0].value,
        password: inputs[1].value,
        fullName: inputs[2].value,
    }

    // записываем объект user в LocalStorage предварительно сконвертировав в строку
    console.log(JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(user));
    // переводим пользователя на страницу second.html
    location.href = "second.html";
})

