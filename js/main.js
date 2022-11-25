const navLib = document.querySelector(".nav__library");
const navSW = document.querySelector(".nav__stopwatch");
const navKanban = document.querySelector(".nav__kanban");

const secLib = document.querySelector(".library__section");
const secSW = document.querySelector(".stopwatch__section");
const secKanban = document.querySelector(".kanban__section");

function switchScreen(showNav, hiddNav1, hiddNav2, showSec, hiddSec1, hiddSec2) {
    showNav.onclick = (() => {
        showNav.classList.add("nav__item-active");
        hiddNav1.classList.remove("nav__item-active");
        hiddNav2.classList.remove("nav__item-active");

        showSec.style.display = "flex";
        hiddSec1.style.display = "none";
        hiddSec2.style.display = "none";
    })
}
switchScreen(navKanban, navLib, navSW, secKanban, secSW, secLib);
switchScreen(navLib, navSW, navKanban, secLib, secSW, secKanban);
switchScreen(navSW, navLib, navKanban, secSW, secLib, secKanban);

// calculator
let firstInt = "";
let secInt = "";
let operator = "";
let equals = false;
let numbersArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
let operatorsArr = ["/", "*", "+", "-"];
let buttonsArr = document.querySelectorAll(".calc-button");
let screen = document.querySelector(".calc-screen");

buttonsArr.forEach((item) => {
    item.onclick = () => {
        let key = item.textContent;

        if (key == "C") {
            clear();
            return;
        }

        if (firstInt == "" && key == "0") {
            firstInt == 0;
            return;
        }

        if (firstInt != "" && secInt == "" && key == "0") {
            secInt == 0;
            return;
        }

        if (numbersArr.includes(key)) {
            if (secInt == "" && operator == "") {
                firstInt += key;
                screen.innerText = firstInt;
            } else if (firstInt != "" && secInt != "" && equals) {
                secInt = key;
                equals = false;
                screen.textContent = secInt;
            } else {
                secInt += key;
                screen.textContent = secInt;
            }
            return;
        }

        if (operatorsArr.includes(key)) {
            operator = key;
            screen.innerText = operator;
            return;
        }

        if (item.classList.contains("root")) {
            firstInt = Math.sqrt(+firstInt);
            equals = true;
            screen.textContent = firstInt;
        }

        if (key == "=") {
            if (secInt == "") secInt = firstInt
            if (operator == "+") firstInt = (+firstInt) + (+secInt)
            else if (operator == "-") firstInt = firstInt - secInt
            else if (operator == "*") firstInt = firstInt * secInt
            else if (operator == "/") firstInt = firstInt / secInt
            equals = true;
            screen.textContent = firstInt;
        }

        if (item.classList.contains("delete")) {
            if (firstInt != "" && operator == "") {
                firstInt = firstInt.slice(0, -1)
                screen.textContent = firstInt;
            } else {
                secInt = secInt.slice(0, -1);
                screen.textContent = secInt;
            }
        }

    }
})

function clear() {
    firstInt = "";
    secInt = "";
    operator = "";
    screen.textContent = 0;
}

// date and time
clock();
setInterval(clock, 10000)

function clock() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes()
    if (minute < 10) {
        minute = "0" + minute;
    } else if (hour < 10) {
        hour = "0" + hour;
    } else if (month < 10) {
        month = "0" + month;
    } else if (day < 10) {
        day = "0" + day;
    }
    document.querySelector(".date").textContent = `${day}.${month}.${year}`;
    document.querySelector(".time").innerHTML = `${hour}:${minute}`
}