function calcHeight() {
    document.querySelector(".boards").style.maxHeight = document.querySelector(".kanban__section").clientHeight - document.querySelector(".kanban__workspace .title").clientHeight - document.querySelector(".kanban__panel").clientHeight - 60 + "px";
}
calcHeight();

// if (localStorage.getItem("workspace")) {
//     document.querySelector(".kanban__section").append(JSON.parse(localStorage.getItem("workspace")));
// }

function addCard() {
    const openFormBtn = document.querySelector(".open-form__btn");
    const form = document.querySelector(".form");
    const addCardBtn = document.querySelector(".add-card__btn");
    const cancelBtn = document.querySelector(".cancel__btn");
    const textarea = document.querySelector(".form__textarea");
    const list = document.querySelector(".list")
    let value;

    openFormBtn.addEventListener("click", () => {
        form.style.display = "block";
        openFormBtn.style.display = "none";
    })
    cancelBtn.addEventListener("click", () => {
        form.style.display = "none";
        openFormBtn.style.display = "block";
    })
    textarea.addEventListener("input", (e) => {
        value = e.target.value;
        if (value) {
            addCardBtn.style.display = "block";
        } else {
            addCardBtn.style.display = "none";
        }
    })
    addCardBtn.addEventListener("click", () => {
        const listItem = document.createElement("DIV");
        listItem.classList.add("list-item");
        listItem.setAttribute("draggable", "true");
        listItem.textContent = textarea.value;
        list.append(listItem);
        textarea.value = "";
        addCardBtn.style.display = "none";
        delCard();
        dragNdrop();
    })
}
addCard();

function delCard() {
    const cardsArr = document.querySelectorAll(".list-item");
    cardsArr.forEach((item) => {
        item.addEventListener("dblclick", function () {
            this.remove();
        })
    })
}
delCard();

const boardsBlock = document.querySelector(".boards");

function addBoard() {
    const addBoardBtn = document.querySelector(".add-board__btn");
    addBoardBtn.addEventListener("click", () => {
        const boardItem = document.createElement("DIV");
        boardItem.classList.add("boards__item");
        boardItem.innerHTML = `<div contenteditable="true" class="board-title">Введите название</div>
                                <div class="list"></div><img class="del-board" src="img/trash.png">`
        boardsBlock.append(boardItem);
        dragNdrop();
        delBoard();
        saveSpace();
    })
}

addBoard();

function delBoard() {
    const delBtnArr = document.querySelectorAll(".del-board");
    delBtnArr.forEach((item) => {
        item.addEventListener("click", () => {
            item.parentElement.remove();
        })
    })
}

let dragItem;

function dragNdrop() {
    const cardArr = document.querySelectorAll(".list-item");
    cardArr.forEach((item) => {
        item.addEventListener("dragstart", () => {
            dragItem = item;
            setTimeout(() => {
                item.style.display = "none";
            }, 0)
        });
        item.addEventListener("dragend", () => {
            setTimeout(() => {
                item.style.display = "flex";

            }, 0);
            dragItem = null;
        });

        const listArr = document.querySelectorAll(".list");
        listArr.forEach((item) => {
            item.addEventListener("dragover", function (e) {
                e.preventDefault();
            })
            item.addEventListener("dragenter", function () {
                item.style.background = "#444";
            })
            item.addEventListener("dragleave", function () {
                item.style.background = "none";
            })
            item.addEventListener("drop", function () {
                this.append(dragItem);
                item.style.background = "none";
            })
        })
    })
}
dragNdrop();

// function saveSpace() {
//     const saveSpaceBtn = document.querySelector(".save-space__btn");
//     const ws = document.querySelector(".kanban__workspace");
//     saveSpaceBtn.addEventListener("click", () => {
//         localStorage.setItem("workspace", JSON.stringify(ws));
//         console.log(ws);
//     })
// }

// saveSpace()