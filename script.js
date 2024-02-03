let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');
let deleteButtons = document.getElementsByClassName('delete');
var count = 0;

console.log('Working');

function renderList() {

    taskList.innerHTML = '';

    for (let task of tasks) {
        const listItem = document.createElement('li');

        const inputOutline = document.createElement('div');

        const input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('id', task.id);
        input.setAttribute('data-id', task.id);
        input.setAttribute('class', 'custom-checkbox');
        input.addEventListener('click', function () {
            markTaskAsComplete(task.id);
        });
        if (task.done) {
            input.checked = true;
        }
        else{
            input.checked=false;
        }

        const label = document.createElement('label');
        label.setAttribute('for', task.id);
        label.innerHTML = task.text;

        const img = document.createElement('img');
        img.setAttribute('src', 'src/bin.jpg');
        img.setAttribute('data-id', task.id);
        img.setAttribute('class', 'delete');
        img.addEventListener('click', function () {
            deleteTask(task.id);
        });

        listItem.appendChild(input);
        listItem.appendChild(label);
        listItem.appendChild(img);

        taskList.appendChild(listItem);
    }
}

function markTaskAsComplete(taskId) {
    for (let task of tasks) {
        if (task.id == taskId) {
            task.done = !task.done;
        }
    }
    renderList();
}

function deleteTask(taskId) {
    const newTasks = tasks.filter(function (task) {
        return task.id !== taskId;
    })
    tasks = newTasks;
    renderList();
    showNotification('Task deleted successfully');
    count--;
    tasksCounter.innerText = count;
}

function addTask(task) {

    if (task) {
        tasks.push(task);
        renderList();
        showNotification('Task added successfully');
        count++;
        tasksCounter.innerText = count;
        return;
    }
    showNotification('Task can not be added');
}

function showNotification(text) {
    alert(text);
}

function handleInputKeyPress(e) {
    if (e.key === 'Enter') {
        const text = e.target.value;
        console.log(text);

        if (!text) {
            showNotification('Task can not be empty');
            return;
        }

        const task = {
            text: text,
            id: Date.now().toString(),
            done: false
        }

        e.target.value = '';
        addTask(task);
    }
}
for (button of deleteButtons) {
    button.addEventListener('click', deleteTask);
}
addTaskInput.addEventListener('keyup', handleInputKeyPress);