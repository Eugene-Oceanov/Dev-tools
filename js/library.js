const funcTitle = document.querySelector(".func-title");
const funcBody = document.querySelector(".func-body");
const saveButton = document.querySelector(".func-save");
const libStorage = document.querySelector(".library__storage");

libStorage.style.height = document.querySelector(".library__section").clientHeight - document.querySelector(".library__panel").clientHeight - 55 + "px";

let funcArr = [];

if (localStorage.getItem("funcArr")) {
    funcArr = JSON.parse(localStorage.getItem("funcArr"));
    renderFunc();
}

saveButton.onclick = () => {
    let func = {
        title: funcTitle.value,
        body: funcBody.value,
    }
    funcArr.push(func);
    renderFunc();
    localStorage.setItem("funcArr", JSON.stringify(funcArr))
    funcTitle.value = "";
    funcBody.value = "";
}

function renderFunc() {
    funcHTML = "";
    funcArr.forEach((item) => {
        funcHTML += `<details class="storage-item"><summary><h1>${item.title}</h1><img src="img/arrow.png" alt="arrow"></summary><pre><code contenteditable="true">${item.body}</code></pre></details>`
    })
    libStorage.innerHTML = funcHTML;
}