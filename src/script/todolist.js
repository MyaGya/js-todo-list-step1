const $todoInput = document.getElementById("new-todo-title");
const $todoList = document.getElementById("todo-list");

$todoInput.addEventListener('keyup', addTodoItem);
$todoList.addEventListener('click', todoComplete);
$todoList.addEventListener('click', todoDelete);
$todoList.addEventListener('dblclick', todoEdit);

function addTodoItem(event) {
    if (event.key === 'Enter' && event.target.value !== "") {
        const addedItem = getTodoItem($todoInput);
        $todoList.insertAdjacentHTML("beforeend", addedItem);
        $todoInput.value = null;  // input clear
    }
}

function todoComplete(event) {
    const todoItem = event.target.closest("li")

    if (event.target.type === 'checkbox' &&
        !event.target.classList.contains("checked")) {
        todoItem.classList.toggle("completed");
        todoItem.querySelector(".toggle").classList.add("checked")
        return;
    }

    if (event.target.type === 'checkbox' &&
        event.target.classList.contains("checked")) {
        todoItem.classList.toggle("completed");
        todoItem.querySelector(".toggle").classList.remove("checked")
        return;
    }
}

function todoDelete(event) {
    if (event.target.tagName === 'BUTTON') {
        event.target.closest("li").remove();
    }
}

function todoEdit(event) {
    const todoItem = event.target.closest("li");
    todoItem.classList.add("editing");
    todoItem.querySelector(".edit").addEventListener('keyup', completeEdit)
}

function completeEdit(event) {
    const todoItem = event.target.closest("li");
    if (event.key === 'Enter') {
        todoItem.querySelector(".label").textContent = event.target.value;
        todoItem.classList.remove("editing");
    }
}

function getTodoItem(itemTitle) {
    return ` <li>
     <div class="view">
        <input class="toggle" type="checkbox"/>
        <label class="label">${itemTitle.value}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="새로운 타이틀" />
      
  </li>`
}
