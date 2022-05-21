// получаем поле вывода постов
let postDiv = $(".post-div");
// получаем поле вывода инф-ии автора
let userDiv = $(".user-div");
// получаем поле вывода комментариев
let commentsDiv = $(".comments-div");

// получаем параметры URL строки
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
//   присваиваем id автора и id поста в переменные
  let userId = params.userid; 
  let postId = params.postid; 

  // иницализируем яндекс карту и выводим на страницу
  let getMap = function(lat, lng){
      console.log("lat=" + lat + " lng=" + lng);
    ymaps.ready(init);
    function init(){
        let myMap = new ymaps.Map("map", {
            // center: [lat, lng], // исходные значения координат, полученные с jsonplaceholder указывают на Индийский океан
            center: [55.76, 37.64],
            zoom: 18
        });
    }
}

// аякс запрос для получения массива авторов постов по указанному id автора
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
  .then(response => response.json())
  .then(
      post => 
      {
        postDiv.empty(); // очищаем поле вывода
        //печатаем на страницу посты автора
        postDiv.append(
            `
            <div class="card">
            <div class="card-body">
                <h5 class="card-title"><b>Title: </b>${post.title}</h5>
                <p class="card-text"><b>Post: </b>${post.body}</p>
            </div>
            </div><br>                  
        `);
    }
  )

// аякс запрос для получения информации по автору по указанному id
fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
  .then(response => response.json())
  .then(
      user => 
      {
        userDiv.empty();// очищаем поле вывода
        //печатаем на страницу информацию по автору
        userDiv.append(
        `<ul class="list-group list-group-flush">
            <li class="list-group-item"><b>Author name:</b> ${user.name}</li>
            <li class="list-group-item"><b>Author username:</b> ${user.username}</li>
            <li class="list-group-item"><b>Author email:</b> ${user.email}</li>
            <li class="list-group-item"><b>Author company name:</b> ${user.company.bs}, ${user.company.catchPhrase}, ${user.company.name}</li>
        </ul>
        `)
        // вызываем метод инициализации и вывода яндекс карты и передаем в нее широту и долготу адреса автора поста
        getMap(user.address.geo.lat, user.address.geo.lng);
        }
    )
    
    // аякс запрос для получения массива комментариев к указанному id поста
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    .then(response => response.json())
    .then(
        comments => 
        {
            // console.log(posts);
            commentsDiv.empty();// очищаем поле вывода
            //печатаем на страницу комментарии
            for(let comment of comments){
                if(comment.postId == postId){
                    commentsDiv.append(
                        `
                        <div class="card">
                        <div class="card-body">
                            <h5 class="card-title"><b>Title: </b> ${comment.name}</h5>
                            <p class="card-text"><b>Comment: </b>${comment.body}</p>
                        </div>
                        </div><br>               
                    `);
                 }
            }
        }
    )
