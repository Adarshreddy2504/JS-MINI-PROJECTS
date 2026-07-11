const taskInput=document.getElementById("task-input");
const addTaskBtn=document.getElementById("add-task");
const todosList=document.getElementById("todos-list");
const clearButton=document.getElementById("clear-completed");
const emptyState=document.querySelector(".empty-state");
const dateElement=document.getElementById("date");
const itemsLeft=document.getElementById("items-left");
const filters=document.querySelectorAll(".filter");

let todos=[];
let currentFilter="all";

addTaskBtn.addEventListener("click", () =>{
    addTodo(taskInput.value);
});

taskInput.addEventListener("keydown", (e) =>{
    if (e.key === "Enter") {
        addTodo(taskInput.value);
    }
});

clearButton.addEventListener("click",clearCompleted);

function addTodo(text) {
    if (text.trim()==="") return;

    const todo={
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(todo);

    taskInput.value="";

    saveTodos();
    renderTodos();
}

function saveTodos(){
    localStorage.setItem("todos", JSON.stringify(todos));

    updateItemsCount();
    checkEmptyState();
}

function updateItemsCount() {
    const uncompletedCount=todos.filter(todo => !todo.completed).length;
    itemsLeft.textContent=`${uncompletedCount} item${uncompletedCount !== 1 ? "s" : ""} left`;
}

// Empty State
function checkEmptyState(){
    const filteredTodos=filterTodos(currentFilter);

    if(filteredTodos.length===0) {
        emptyState.classList.remove("hidden");
    } 
    else{
        emptyState.classList.add("hidden");
    }
}

function filterTodos(filter){
    switch (filter){
        case "active":
            return todos.filter(todo => !todo.completed);

        case "completed":
            return todos.filter(todo =>todo.completed);

        default:
            return todos;
    }
}

function renderTodos() {
    todosList.innerHTML="";

    const filteredTodos=filterTodos(currentFilter);

    filteredTodos.forEach(todo => {

        const todoItem=document.createElement("li");
        todoItem.classList.add("todo-item");

        if (todo.completed){
            todoItem.classList.add("completed");
        }

        const checkbox=document.createElement("input");
        checkbox.type="checkbox";
        checkbox.checked=todo.completed;

        checkbox.addEventListener("change",() =>{
            toggleTodo(todo.id);
        });

        const todoText=document.createElement("span");
        todoText.textContent=todo.text;

        const deleteButton=document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.innerHTML='<i class="fas fa-trash"></i>';

        deleteButton.addEventListener("click",() =>{
            deleteTodo(todo.id);
        });

        const actions = document.createElement("div");
        actions.classList.add("task-actions");

        actions.appendChild(checkbox);
        actions.appendChild(deleteButton);
        todoItem.appendChild(todoText);
        todoItem.appendChild(actions);
        todosList.appendChild(todoItem);
    });

    checkEmptyState();
}


function toggleTodo(id){
    todos = todos.map(todo => {
        if (todo.id===id) {
            return {
                ...todo,
                completed: !todo.completed
            };
        }
        return todo;
    });

    saveTodos();
    renderTodos();
}

function deleteTodo(id){
    todos=todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

function clearCompleted(){
    todos=todos.filter(
        todo=>!todo.completed
    );
    saveTodos();
    renderTodos();
}


function loadTodos(){
    const storedTodos=localStorage.getItem("todos");

    if(storedTodos){
        todos=JSON.parse(storedTodos);
    }

    renderTodos();
}

function displayDate() {
    const today=new Date();
    dateElement.textContent =
        today.toLocaleDateString("en-US",{
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        });
}

filters.forEach(filter =>{
    filter.addEventListener("click",() =>{
        filters.forEach(f =>f.classList.remove("active"));
        filter.classList.add("active");
        currentFilter=filter.dataset.filter;

        renderTodos();
    });
});

window.addEventListener("DOMContentLoaded", () => {
    displayDate();
    loadTodos();
    updateItemsCount();
    checkEmptyState();
});