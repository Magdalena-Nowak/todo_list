let todoInput,
  todoButton,
  todoList,
  filterOption,
  errorInfo,
  newTodo,
  popup,
  popupInfo,
  todoToEdit,
  popupInput,
  popupAddBtn,
  allTodos,
  popupCloseBtn,
  todos;

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
  getLocalTodos();
};
const prepareDOMElements = () => {
  todoInput = document.querySelector(".todo-input");
  todoButton = document.querySelector(".todo-button");
  todoList = document.querySelector(".todo-list");
  filterOption = document.querySelector(".filter-todo");
  errorInfo = document.querySelector(".error-info");

  popup = document.querySelector(".popup");
  popupInfo = document.querySelector(".popup-info");
  popupInput = document.querySelector(".popup-input");
  popupAddBtn = document.querySelector(".accept");
  popupCloseBtn = document.querySelector(".cancel");
};

const prepareDOMEvents = () => {
  todoButton.addEventListener("click", addNewTask);
  todoList.addEventListener("click", checkClick);
  popupCloseBtn.addEventListener("click", closePopup);
  popupAddBtn.addEventListener("click", approvePopup);
  filterOption.addEventListener("click", filterTodo);
};

//Functions
function addTodo() {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const completeButton = document.createElement("button");
  completeButton.classList.add("complete-btn");
  completeButton.innerHTML = '<i class="fas fa-check-circle"></i>';

  const changeButton = document.createElement("button");
  changeButton.classList.add("change-btn");
  changeButton.textContent = "Edit";

  const trashButton = document.createElement("button");
  trashButton.classList.add("trash-btn");
  trashButton.innerHTML = '<i class="fas fa-minus-circle"></i>';

  todoDiv.append(completeButton, changeButton, trashButton);
  newTodo.append(todoDiv);
}

const addNewTask = (event) => {
  event.preventDefault();
  if (todoInput.value !== "") {
    newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.textContent = todoInput.value;
    todoList.append(newTodo);
    addTodo();
    saveLocalTodos(todoInput.value);
    todoInput.value = "";
    errorInfo.textContent = "";
  } else {
    errorInfo.textContent = "Wpisz treść zadania!";
  }
};

const checkPresenceLi = () => {
  allTodos = todoList.querySelectorAll("li");
  if (allTodos.length !== 0) {
    errorInfo.textContent = "";
  } else {
    errorInfo.textContent = "Brak zadań na liście";
  }
};

const checkClick = (e) => {
  if (e.target.matches(".complete-btn")) {
    e.target.closest("li").classList.toggle("completed");
  } else if (e.target.matches(".trash-btn")) {
    removeItems(e);
    removeLocalTodos(e.target);
    checkPresenceLi();
  } else if (e.target.matches(".change-btn")) {
    editTodo(e);
  }
};

const editTodo = (e) => {
  popup.classList.add("active");
  todoToEdit = e.target.closest("li");
  popupInput.value = todoToEdit.firstChild.textContent;
};

const closePopup = () => {
  popup.classList.remove("active");
  popupInput.value = "";
  popupInfo.textContent = "";
};

const approvePopup = () => {
  if (popupInput.value !== "") {
    todoToEdit.firstChild.textContent = popupInput.value;
    popup.classList.remove("active");
    popupInfo.textContent = "";
  } else {
    popupInfo.textContent = "Musisz wprowadzić jakąś treść!";
  }
};

const removeItems = (e) => {
  const todo = e.target.closest("li");
  todo.classList.add("fall");
  todo.addEventListener("transitionend", function () {
    todo.remove();
  });
};

//filter
const filterTodo = (e) => {
  const todos = todoList.children;
  console.log(todos);
  for (const todo of todos) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  }
};

//Save to localStorage

const saveLocalTodos = (todo) => {
  if (localStorage.getItem("todos") === null) {
    todosArr = [];
  } else {
    todosArr = JSON.parse(localStorage.getItem("todos"));
  }
  todosArr.push(todo);
  localStorage.setItem("todos", JSON.stringify(todosArr));
};

const getLocalTodos = () => {
  if (localStorage.getItem("todos") === null) {
    todosArr = [];
  } else {
    todosArr = JSON.parse(localStorage.getItem("todos"));
  }
  todosArr.forEach(function (todo) {
    newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.textContent = todo;
    todoList.append(newTodo);
    addTodo();
  });
  checkPresenceLi();
};

const removeLocalTodos = (todo) => {
  todosArr = JSON.parse(localStorage.getItem("todos"));

  const searchedTodo = todo.closest("li").textContent.replace("Edit", "");
  todosArr.splice(todosArr.indexOf(searchedTodo), 1);
  localStorage.setItem("todos", JSON.stringify(todosArr));
};

// localStorage.clear();

document.addEventListener("DOMContentLoaded", main);
