// секундомер
let stopwatch = document.getElementById('stopwatch');
// результат круга
let round = document.getElementById('round');
// кнопка фиксации результа круга
let fix = document.getElementById('fix');
// кнопка сброса параметров секундомера
let reset = document.getElementById('reset');
let sec = 0; // секунды
let min = 0; // минуты
let hrs = 0; // часы
let cnt = 0; // счетчик результатов
let t; // таймаут

// функция подсчета времени
let tick = function (){
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
        if (min >= 60) {
            min = 0;
            hrs++;
        }
    }
}

// функция отрисовки текущего значения секундомера
let add = function() {
    tick();
    stopwatch.innerText = 
                     (hrs > 9 ? hrs : "0" + hrs) 
        	 + ":" + (min > 9 ? min : "0" + min)
       		 + ":" + (sec > 9 ? sec : "0" + sec);
    timer();
}

// функция генерации секундомера
let timer = function() {
    t = setTimeout(add, 1000);
}
timer();

// событие на кнопку сброса параметров секундомера
reset.addEventListener('click', ()=>{
    stopwatch.innerText = "00:00:00";
    round.innerText = "";
    sec = 0; min = 0; hrs = 0; cnt = 0;
})

// событие на кнопку фиксации результатов секундомера
fix.addEventListener('click', ()=>{
    console.log(stopwatch.innerText);
    round.innerHTML += (++cnt) + ") " + stopwatch.innerText + "<br>";
})