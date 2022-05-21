// получаем поле select выбора автора
let usersSelect = $(".form-select");
// получаем кнопку filter
let filterBtn = $(".btn");
// получаем поле вывода постов
let postDiv = $(".post-div");
// устанавливаем по умолчанию id = 1 автора поста согласно первому элементу в выпадающем списке
let userId = 1;

// аякс запрос для получения массива авторов постов
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(
      users => 
      {
          console.log(users);
          for(let user of users){
            // наполнение выпадающего списка авторов
            usersSelect.append(`<option id="${user.id}" value="${user.name}">${user.name}</option>`);
        }
      }
    )

// вешаем обработчик событий на выпадающий список авторов постов
usersSelect.change((ev)=>{
    // при выборе другого меняем значение userId
    userId = $('.form-select option:selected').attr("id");

})
// вешаем обработчик событий кнопку фильтрации(поиска) постов
filterBtn.click(()=>{
    //вызываем метод получения всех постов по указанному id автора
    getPosts(userId);
});

// метод получения и вывода всех постов по указанному id автора
let getPosts = function(userId){
    fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then(response => response.json())
    .then(
        posts => 
        {
            // console.log(posts);
            postDiv.empty();
            for(let post of posts){
                if(post.userId == userId){
                    console.log("post.userId = "+post.userId);
                    console.log("userId = "+userId);
                    postDiv.append(
                        `
                        <div class="card">
                        <div class="card-body">
                            <h5 class="card-title"><b>Title: </b> ${post.title}</h5>
                            <p class="card-text"><b>Post: </b>${post.body}</p>
                            <a href="post.html?postid=${post.id}&userid=${post.userId}" class="btn btn-primary">подробнее...</a>
                        </div>
                        </div><br>                 
                    `);
                 }
            }
        }
    )
}

//вызываем метод в первый раз для вывода всех постов по id=1 автора
getPosts(userId=1);