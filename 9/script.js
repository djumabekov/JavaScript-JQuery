//=============Подключение виртуальной клавиатуры=============

// Функция отправки сообщения
function sendEmail(){

    let templateParams = {
        theme: "Тестовое письмо",
        text: document.querySelector("#input_text_block").innerText,
        receiver_email: document.querySelector("#input_email_block").innerText,
    };
        
    emailjs.send('service_45kzbvl', 'template_yjtg9ef', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            message.innerHTML = "Письмо успешно отправлено";
            message.style.color = "green";
        }, function(error) {
            console.log('FAILED...', error);
            message.innerHTML = "Ошибка! Письмо не отправлено";
            message.style.color = "red";
        });
}

// Функция отрисовки клавиши клавиатуры
const drawButton = (value, isSpace) => {
    let buttonsContainer = document.querySelector("#buttons_container");
    buttonsContainer.innerHTML += `
        <button class="button ${value == ' '? 'space': ''}">
            ${value.toUpperCase()}
        </button>
    `;
}

// Наименование клавиш клавиатуры
let keyboardButtonValues = ['q', 'w', 'e', 'r','t','y','u','i','o','p',
                             'a', 's', 'd', 'f', 'g', 'h', 'j', 'k',
                             'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⏎', '@', '-', '_', '.', ' ',
                           ];


// Цикл вызова функции отрисовки клавиши клавиатуры                         
for(let item of keyboardButtonValues){
    drawButton(item);
}                          

// Получаем поле для отрисовки клавиатуры
let buttonElements = document.querySelectorAll(".button");
// Получаем поле для ввода текста
let inputTextBlock = document.querySelector("#input_text_block");
// Получаем поле для ввода почты
let inputEmailBlock = document.querySelector("#input_email_block");
// Получаем поле для вывода статуса отправки сообщения
let message = document.querySelector("#message");
// Переменная хранящая текущее активное поле ввода 
let currentInputBlock;

// Вешаем событие на поле ввода текста для выбора его в качестве активного при клике
inputTextBlock.addEventListener('click', ()=>{
    currentInputBlock = inputTextBlock;
})

// Вешаем событие на поле ввода почты для выбора его в качестве активного при клике
inputEmailBlock.addEventListener('click', ()=>{
    currentInputBlock = inputEmailBlock;
})

// Вешаем событие на клавиши для отображения в поле ввода при клике
for(let i=0; i<buttonElements.length; i++){
    buttonElements[i].addEventListener('click', ()=>{
        let value = buttonElements[i].innerText;
        if(value == '') {value = '&nbsp';}
        if(value == '⏎'){
            sendEmail();
        } else{
            console.log(value);
            currentInputBlock.innerHTML += value;
        }
    })
}