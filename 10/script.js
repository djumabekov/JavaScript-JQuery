//переменная  - исходный язык
let sourceLang;
//переменная  - язык перевода
let targetLang; 

//функция печати истории поиска из localStorage
function showHistory(){
    let historyText = $("#historyText");
    historyText.empty();
    let historyArray = JSON.parse(localStorage.getItem("history")) || []; // получаем данные из localStorage, при отсутствии создаем пустой массив

    //выводим информацию на страницу
    for(let item of historyArray){
        historyText.append(`<p> ${item.sourseText} - ${item.translatedText} (${item.translateDate}) </p>`);
    }
};
showHistory();

//функция возвращающая текущую дату и время
let getDate = function(){
    let d = new Date,
    dformat = [d.getMonth()+1,
               d.getDate(),
               d.getFullYear()].join('/')+' '+
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':');
    return dformat;
}

//Событие изменения языка перевода из выпадающего списка
$('#targetLang').on('change', function () {
    targetLang = $('#targetLang option:selected').text();
    // console.log(val);
});

//Событие изменения текущего языка из выпадающего списка
$('#sourceLang').on('change', function () {
    sourceLang = $('#sourceLang option:selected').text();
    // console.log(val);
});


//Функция Ajax запрос к АПИ переводчика для автоопределения исходного языка
let getTranslateWithAutodetect = function(){
    const settings3 = {
        async: true,
        crossDomain: true,
        url: "https://google-translate1.p.rapidapi.com/language/translate/v2/detect",
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "Accept-Encoding": "application/gzip",
            "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
            "X-RapidAPI-Key": "1d576d8a73mshd14c751fe963ef0p140128jsn3bdaa09d67da"
        },
        data: {
            q: $("#sourceText").val(), // получаем исходный текст для перевода
        }
    };

    $.ajax(settings3).done(function (response) {
        console.log(response.data.detections[0][0].language);
        sourceLang = response.data.detections[0][0].language;
        $('#sourceLang option:selected').text(sourceLang); // меняем язык в списке исходного языка 
                                                            // на автоопределенный язык 
        getTranslate();
    });
}

//Событие на кнопку для вызова функции запроса к АПИ переводчика для автоопределения исходного языка
$("#translateWithAutodetectBtn").click(()=>{
    getTranslateWithAutodetect();
})

//Функция Ajax запрос к АПИ переводчика без автоопределения исходного языка
let getTranslate = function(){
    const settings = {
        async: true,
        crossDomain: true,
        url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
        method: "POST",
        data: {
            q: $("#sourceText").val(),
            target: targetLang, // принимаем язык перевода
            source: sourceLang // принимаем исходный язык текста
        },
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "Accept-Encoding": "application/gzip",
            "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
            "X-RapidAPI-Key": "1d576d8a73mshd14c751fe963ef0p140128jsn3bdaa09d67da"
        },
        error: ()=>{
            alert("Что-то пошло не так");
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);

        $("#resultText").empty(); // отчищаем поле вывода перевода
        $("#resultText").append(response.data.translations[0].translatedText);

        // формируем объект с информацией о текущем тексте, переводе и дате
        let translationObject = {
            sourseText: $("#sourceText").val(),
            translatedText: response.data.translations[0].translatedText,
            translateDate: getDate(),
        }

        // получаем с localStorage историю переводов
        let historyArray = JSON.parse(localStorage.getItem("history"))||[];
        
        // записываем историю переводов в массив
        historyArray.push(translationObject);

        // записываем массив в localStorage
        localStorage.setItem("history", JSON.stringify(historyArray));

        // отображаем историю на странице
        showHistory();
    });
}

//Вешаем событие на кнопку для вызова функции запроса к АПИ переводчика без автоопределения исходного языка
$("#translateBtn").click(()=>{
    getTranslate();
})


//Ajax запрос к АПИ переводчика для получения списка доступных языков
let getLanguagesList = function(){

    // получаем с localStorage текущие языки
    let langArray = JSON.parse(localStorage.getItem("langArray"));

     // если localStorage возвращает NULL (нет записей) создаем пустой массив и запускаем AJAX запрос для заполнения выпадающего списка
    if(langArray == null) {
        langArray = [];
        
        const settings2 = {
            async: true,
            crossDomain: true,
            url: "https://google-translate1.p.rapidapi.com/language/translate/v2/languages",
            method: "GET",
            headers: {
                "Accept-Encoding": "application/gzip",
                "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
                "X-RapidAPI-Key": "1d576d8a73mshd14c751fe963ef0p140128jsn3bdaa09d67da"
            }
        };

        $.ajax(settings2).done(function (response) {
            console.log(response);
            $("#targetLang").empty();
            $("#sourceLang").empty();

            for(let i=0; i<response.data.languages.length; i++ ){
                langArray.push(response.data.languages[i].language);
                $("#targetLang").append(
                    `
                    <option value="">${response.data.languages[i].language}</option>
                    `
                );
    
                $("#sourceLang").append(
                    `
                    <option value="">${response.data.languages[i].language}</option>
                    `
                );
            }
            console.log("langArray = " + langArray);
            localStorage.setItem("langArray", JSON.stringify(langArray));
        });
    }
    // если LоcalStorage возвращает данные, то просто выводим данные массива в выпадающий список без повторного AJAX запроса 
    else{
        for(let i=0; i<langArray.length; i++ ){
            $("#targetLang").append(
                `
                <option value="">${langArray[i]}</option>
                `
            );

            $("#sourceLang").append(
                `
                <option value="">${langArray[i]}</option>
                `
            );
        }
    }

}
getLanguagesList();


