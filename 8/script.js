let button = $("#btn");

//вешаем событие на кнопку поиска
button.click(()=>{
   
    //получаем значение поля поиска
    let city = $("#city");
    console.log(city.val());

    //устанавливаем соединение с API прогноза погоды на текущий день
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://community-open-weather-map.p.rapidapi.com/weather?q=" + city.val(), //или city.value
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "e9452b5dc7mshcec7903a92ac17ep19fe48jsnfaa3fe23377b"
        }
    };
    
    // выводим полученный результат прогноза погоды на текущий день на страницу
    $.ajax(settings).done(function (response) {
        console.log(response);

        let resultBlock = $("#results");
            resultBlock[0].innerHTML = "";
            resultBlock.append(`<h1><u>Погода сегодня:</u></h1> <br>`);
            resultBlock.append(
                `<h1>Город: ${response.name}</h1> <br>
                 <h1>Погода: ${(response.main.temp-273.15).toFixed(2)}</h1> <br>
                 <h1>Ощущается как: ${(response.main.feels_like-273.15).toFixed(2)}</h1> <br>
                 <h1>Ветер: ${response.wind.speed}</h1> <br>
            `)
        });

        // //устанавливаем соедение с API прогноза погоды на ближайшие 10 дней
        const settings2 = {
            "async": true,
            "crossDomain": true,
            "url": "https://community-open-weather-map.p.rapidapi.com/forecast/daily",
            "data": {
                q: city.val(),
                cnt: 10,
            },
            "method": "GET",
            "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "e9452b5dc7mshcec7903a92ac17ep19fe48jsnfaa3fe23377b"
        }
    }

    // выводим полученный результат прогноза погоды на ближайшие 10 дней на страницу
    $.ajax(settings2).done(function (response) {
        console.log(response);

        let resultBlock2 = $("#results2");
        let date = new Date();
        resultBlock2.append(`<h1><u>Погода на ближайшую неделю:</u></h1> <br>`);
        for(let i=0; i<response.cnt; i++){
            resultBlock2.append(
            `<h1>Дата: ${date.getDate() + i + "-" + Number(date.getMonth()+1) + "-" + date.getFullYear()}</h1> <br>
                <h1>Город: ${response.city.name}</h1> <br>
                <h1>Погода: ${(response.list[i].temp.day-273.15).toFixed(2)}</h1> <br>
                <h1>Ощущается как: ${(response.list[i].feels_like.day-273.15).toFixed(2)}</h1> <br> 
                <h1>Ветер: ${response.list[i].speed}</h1> <br>  
            `)
        }
    });


    // получаем список истории предыдущего поиска из localStorage
    let findList = JSON.parse(localStorage.getItem("findList"));
    let findResult = document.getElementById("findResult");
    console.log("findList = " + findList);
    
     // если список найден в localStorage выводим элементы предыдущего поиска на страницу
    if(findList !== null){
        findResult.innerHTML = "";
        for(let item of findList){
            findResult.innerHTML += `<span> ${item + ", "} </span>`;
        }
    } 
     // если список не найден в localStorage, создаем пустой массив
    else{findList = [];}

     // если в массиве localStorage отсутствует город, то добавляем его в массив, иначе нет
     if(!findList.includes(city.val())){
        console.log(findList.includes(city.val()));
        findList.push(city.val());
        localStorage.setItem('findList', JSON.stringify(findList));
    }
})