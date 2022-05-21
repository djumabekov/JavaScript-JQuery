//блок вывода фильма
let filmsBlock = $("#filmsBlock");
//поле ввода название фильма
let inputFilmName = $("#inputFilmName");
//кнопка поиска фильма
let searchBtn = $("#searchBtn");
//ключ к АПИ
let API_KEY = "4f5889ae";

//вешаем событие на кнопку поиска фильма
searchBtn.click(()=>{
    let URL = `http://www.omdbapi.com/?t=${inputFilmName.val()}&apikey=${API_KEY}`;
    let settings = {
        url: URL,
        method: "GET",
        success: (response) => {
            console.log(response);
            drawNews(response);
        },
    
        error: ()=>{}
    }
    
    $.ajax(settings);
});

//отрисовываем найденный фильм на страницу
let drawNews = function(response){
    filmsBlock.empty();
    filmsBlock.append(`
        <img src="${response.Poster}" alt="" width="100px" height="100px"> <br>
        <p>Название: ${response.Title}</p>
        <p>Актеры: ${response.Actors}</p>
        <p>Язык: ${response.Language}</p>
        <hr>
    `)
}
