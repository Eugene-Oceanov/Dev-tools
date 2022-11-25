const timer = document.querySelector(".stopwatch__timer");
const start = document.querySelector(".start");
const pause = document.querySelector(".pause");
const stop = document.querySelector(".stop");
const save = document.querySelector(".save");
const tPointTopic = document.querySelector("#timepoint-topic")
const tPointDescription = document.querySelector("#timepoint-description");
const timerStorage = document.querySelector(".stopwatch__storage");

let i;

let hrs = 0,
    min = 0,
    sec = 0;

let date = new Date();

console.log(date)

timer.textContent = "00:00:00"

timerStorage.style.height = document.querySelector(".stopwatch__section").clientHeight - document.querySelector(".stopwatch__block").clientHeight - 55 + "px";

function calcTime() {
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

function addZero() {
    calcTime();
    timer.textContent = (hrs > 9 ? hrs : "0" + hrs)
        + ":" + (min > 9 ? min : "0" + min)
        + ":" + (sec > 9 ? sec : "0" + sec);
}

function timerStart() {
    clearInterval(i);
    i = setInterval(addZero, 1000);
}

function timerPause() {
    clearInterval(i);
}

function timerStop() {
    timer.textContent = "00:00:00";
    hrs = 0;
    min = 0;
    sec = 0;
    timerPause();
}

start.onclick = timerStart;
pause.onclick = timerPause;
stop.onclick = timerStop;

let tPointsArr = [];
let tPointCounter = 1;

if (localStorage.getItem("timepointsArray")) {
    tPointsArr = JSON.parse(localStorage.getItem("timepointsArray"));
    tPointCounter = parseInt(localStorage.getItem("timepointID"));
    renderTPoint();
}

save.onclick = () => {
    let tPoint = {
        id: tPointCounter,
        topic: tPointTopic.value,
        tPoint: timer.textContent,
        date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
        description: tPointDescription.value,
    }
    tPointsArr.push(tPoint);
    tPointCounter++;
    renderTPoint();
    localStorage.setItem("timepointsArray", JSON.stringify(tPointsArr));
    localStorage.setItem("timepointID", JSON.stringify(tPointCounter));
    timerStop();
    tPointTopic.value = "";
    tPointDescription.value = "";
}

function renderTPoint() {
    let tPointItem = "";
    tPointsArr.forEach(function (item) {
        tPointItem += `<details class="timepoint-item storage-item">
        <summary><div><h1>${item.id}. ${item.topic}, ${item.date}</h1></div><img src="img/arrow.png" alt="arrow"></summary>
        <p class="timepoint">${item.tPoint}</p>
        <p>${item.description}</p>
        </details>`
        timerStorage.innerHTML = tPointItem;
    })
}
