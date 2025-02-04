const outputArea = document.querySelector(".right-area");
const inputBox = document.querySelector("#input-box");
const leftArea = document.querySelector(".left-area");

const inputNote = document.querySelector("#new-note");
inputNote.value = "";
inputNote.placeholder ="Write your note...";

const inputTitle = document.querySelector("#new-title");
inputTitle.value = "";
inputTitle.placeholder ="Title";

const inputButton = document.querySelector("#input-button");
inputButton.textContent = "Add note";

const leftSpan = document.createElement("span");
leftSpan.id = "small-span";
leftSpan.textContent = "NOTES";

let data = localStorage.getItem("savedNotes");
let noteArray = data ? JSON.parse(data) : []; // if data exist, parse/read it, if not make a new array
let activeNote = null;

function showNotes() {
  const ulNote = document.createElement("ul");
  activeNote = null;
  leftArea.innerHTML = "";

  noteArray.forEach((element, index) => {
    const liList = document.createElement("li");

    const liTitle = document.createElement("span");
    liTitle.setAttribute("class", "left-title");
    liTitle.innerHTML = element.title

    const liText = document.createElement("span");
    liText.setAttribute("class", "left-span");
    liText.innerHTML = element.note

    const liDelete = document.createElement("button");
    liDelete.setAttribute("class", "opt-button");
    liDelete.title =  "Delete";
    liDelete.addEventListener("click", (event) => deleteNotes(index, event));

    const liEdit = document.createElement("button");
    liEdit.setAttribute("class", "opt-button");
    liEdit.title =  "Edit";
    liEdit.addEventListener("click", (event) => editNotes(index, event));

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-regular", "fa-trash-can");

    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-regular", "fa-pen-to-square");

    liList.addEventListener("click", () => {
      if (activeNote == index) {
        showNotes();
        returnDefault();
      } else {
        showNotesMain(index);
        activeNotes(index);
      }
    });

    leftArea.appendChild(leftSpan);
    leftArea.appendChild(ulNote);

    ulNote.appendChild(liList);
    liList.appendChild(liTitle);
    liList.appendChild(liText);
    liList.appendChild(liEdit);
    liList.appendChild(liDelete);

    liDelete.appendChild(deleteIcon);
    liEdit.appendChild(editIcon);
  });
}

function showNotesMain(index) {
  activeNote = index;
  console.log(activeNote);
  const notesMain = document.createElement("p");
  const notesTitle = document.createElement("p")

  notesTitle.setAttribute("class", "main-title");
  notesMain.setAttribute("class", "main-para");

  notesMain.innerHTML = noteArray[index].note;
  notesTitle.innerHTML = noteArray[index].title;

  outputArea.innerHTML = "";
  outputArea.appendChild(notesTitle);
  outputArea.appendChild(notesMain);
}

function editNotes(index, event) {
  event.stopPropagation();
  outputArea.innerHTML = "";
  inputTitle.value = noteArray[index].title;
  inputNote.value = noteArray[index].note;
  const editButton = document.createElement("button");
  editButton.id = "input-button";
  editButton.textContent = "Save note";

  editButton.addEventListener("click", () => {
    noteArray[index].title = inputTitle.value;
    noteArray[index].note = inputNote.value;
    localStorage.setItem("savedNotes", JSON.stringify(noteArray));
    inputTitle.value = "";
    inputNote.value = "";
    showNotesMain(index);
    activeNotes(index);
  });

  outputArea.appendChild(inputBox);
  outputArea.appendChild(editButton);
}

function activeNotes(index) {
  const liList = document.querySelectorAll("li");
  const spanList = document.querySelectorAll(".left-span");
  const spanTitle = document.querySelectorAll(".left-title");
  const listTitle = noteArray[index].title;
  const listNote = noteArray[index].note;

  for (let list of liList) {
    list.style.removeProperty("border");
    list.style.removeProperty("background-color");
    // remove style added in js return to default css
  }

  liList[index].style.border = "solid 1px rgb(148, 148, 148)";
  liList[index].style.backgroundColor = "rgba(24, 24, 24, 0.637)";
  spanTitle[index].innerHTML = listTitle;
  spanList[index].innerHTML = listNote;
}

function deleteNotes(index, event) {
  event.stopPropagation();
  noteArray.splice(index, 1);
  localStorage.setItem("savedNotes", JSON.stringify(noteArray));
  outputArea.innerHTML = "";

  outputArea.appendChild(inputBox);
  outputArea.appendChild(inputButton);
  showNotes();
}

function Notes(title, note) {
  this.title = title;
  this.note = note;
}

function addNewNotes() {
  const newNote = new Notes(inputTitle.value, inputNote.value)
  noteArray.push(newNote);
  localStorage.setItem("savedNotes", JSON.stringify(noteArray));
  console.log(localStorage.getItem("savedNotes"));
  inputTitle.value = "";
  inputNote.value = "";
}

function returnDefault() {
  outputArea.innerHTML = "";

  outputArea.appendChild(inputBox);
  outputArea.appendChild(inputButton);
}

inputButton.addEventListener("click", () => {
  if (inputNote.value.trim() === "") {
    return; // do nothing on empty input
  } else {
    addNewNotes();
    showNotes();
  }
});

showNotes();
