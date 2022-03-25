// получаем элементы логин и пароль
let login = document.getElementById("login");
let pass = document.getElementById("pass");

// получаем кнопки авторизации и регистрации
let authorizationBtn = document.getElementById("authorization")
let registrationBtn = document.getElementById("registration");

// получаем поле вывода сообщения пользователю
let userMessage = document.getElementById("userMessage");

// вешаем событие на кнопку регистрации пользователя
registrationBtn.addEventListener('click', ()=>{
    let loginValue = login.value;
    let passValue = pass.value;
    let userFound = false; // флажок сигнализирующий о наличии пользователя

    // создаем объект пользователя
    let userObject = {
        login: loginValue,
        pass: passValue,
    }
    console.log(userObject);

    // подтягиваем массив пользователей с localStorage
    let usersArray = JSON.parse(localStorage.getItem("usersArray"));
    if(usersArray === null){ //если JSON возвращает null 
        usersArray = [];     //то создаем пустой массив пользователей
    } else{
        for(item of usersArray){
            if(item.login == userObject.login){
                userFound = true;
                break;
            }
        }
    }
    console.log("usersArray = " + usersArray);
    // если пользователь найден
    if(userFound == true){
        userMessage.innerHTML = "Пользователь с таким логином уже существует!";
    } 
    // если пользователь не найден
    else{
        usersArray.push(userObject); // добавляем пользователя в массив
        localStorage.setItem('usersArray', JSON.stringify(usersArray)); // записываем обновленный массив пользователей в localStorage
        userMessage.innerHTML = "Пользователь успешно зарегистрировался! Попробуйте авторизоваться.";
    }
})

// вешаем событие на кнопку авторизации пользователя
authorizationBtn.addEventListener('click', ()=>{
    let loginValue = login.value;
    let passValue = pass.value;
    let userFound = false; // флажок сигнализирующий о наличии пользователя
    // подтягиваем массив пользователей с localStorage и ищем такого пользователя
    let usersArray = JSON.parse(localStorage.getItem("usersArray"));
    if(usersArray !== null){ //если JSON возвращает не null ищем в нем пользователя
        for(item of usersArray){
            if(item.login == loginValue && item.pass == passValue){
                userFound = true;
                break;
            }
        }
    } 
    // если пользователь найден
    if(userFound == true){
        userMessage.innerHTML = "Вы успешно авторизованы!";
        localStorage.setItem('authSuccess', true); // записываем флажок со значением true в localStorage указывающий на успешную авторизацию пользователя 
        setTimeout(location.href = "catalog.html", 2000); // переводим пользователя на страницу с каталогом товаров
    } 
    // если пользователь или пароль не найден
    else{ 
        userMessage.innerHTML = "Пользователь или пароль не найден!";
    }
})