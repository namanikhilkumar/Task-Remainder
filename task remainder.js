let tasks = [];

function addTask() {
    const taskName = document.getElementById("taskName").value;
    const taskTime = document.getElementById("taskTime").value;

    if (taskName && taskTime) {
        const newTask = {
            name: taskName,
            time: taskTime,
            done: false
        };

        tasks.push(newTask);
        displayTasks();
    } else {
        alert("Please fill in both Task Name and Time before adding a task.");
    }
}

function toggleTaskDone(index) {
    tasks[index].done = !tasks[index].done;
    displayTasks();
}

function displayTasks() {
    const taskListContainer = document.getElementById("taskList");
    taskListContainer.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskItem = document.createElement("div");
        taskItem.innerHTML = `
            <strong>${task.name}</strong> - Time: ${task.time} - Done: ${task.done ? "Yes" : "No"}
            <button onclick="toggleTaskDone(${index})">Toggle Done</button>
        `;
        taskListContainer.appendChild(taskItem);
    });
}
