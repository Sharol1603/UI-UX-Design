document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            taskItem.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}" />
                <span>${task.text}</span>
                <button onclick="deleteTask(${index})">Delete</button>
            `;
            taskList.appendChild(taskItem);
        });
    }

    // Function to add a task
    function addTask() {
        const text = taskInput.value.trim();
        if (text) {
            tasks.push({ text, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = '';
        }
    }

    // Function to mark task as completed
    function toggleComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    // Function to delete a task
    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    // Function to save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Event listeners
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Initial render
    renderTasks();
});