const inputToDo = document.querySelector('.new-task');
const addBtn = document.querySelector('.add-task');
const tasksList = document.querySelector('#tasksList');
const taskItem = document.querySelector('.task-item');
const input = document.querySelector('.create-task');

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task) => renderTask(task));
}

addBtn.addEventListener('click', addTask);
tasksList.addEventListener('click', doneTask);
tasksList.addEventListener('click', deleteTask);
input.addEventListener('keypress', pressEnter);


function addTask() {

    if(inputToDo.value === '') return;

    const newTask = {
        id: Date.now(),
        text: inputToDo.value,
        done: false
    };

    tasks.push(newTask);
    saveToLS();

    renderTask(newTask);

    inputToDo.value = '';
    inputToDo.focus();

}

function doneTask(e) {

    if(e.target.closest('.done')) {
       const li = e.target.closest('.task-item');
       const id = parseInt(li.id);
       const task = tasks.find(task => task.id === id);
       task.done = !task.done;   

       saveToLS();   

       li.querySelector('span').classList.toggle('done-task');
    }
}

function deleteTask(e) {

    if(e.target.closest('.delete')) {
        const id = parseInt(e.target.closest('.task-item').id);

        tasks = tasks.filter((task) => task.id !== id);

        saveToLS();

       e.target.closest('.task-item').remove();
    }
}

function saveToLS() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(task) {
    const cssClass = task.done ? "task-title done-task" : "task-title";

    tasksList.innerHTML += `<li id = "${task.id}" class="task-item">
    <span class = "${cssClass}">${task.text}</span>
    <div class="task-item-btn">
        <button class="done">
            <img src="./img/done_arr.svg" alt="done" width="18" height="18">
        </button>
        <button class="delete">
            <img src="./img/delete_arr.svg" alt="delete" width="18" height="18">
        </button>
    </div>
</li>`;
}

function pressEnter(e) {
    if (e.key === "Enter") addBtn.click();
}