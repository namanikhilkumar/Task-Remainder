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

        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        })
        .then(response => response.json())
        .then(updatedTasks => {
            tasks = updatedTasks;
            displayTasks();
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert("Please fill in both Task Name and Time before adding a task.");
    }
}

function toggleTaskDone(index) {
    tasks[index].done = !tasks[index].done;

    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tasks),
    })
    .then(response => response.json())
    .then(updatedTasks => {
        tasks = updatedTasks;
        displayTasks();
    })
    .catch(error => console.error('Error:', error));
}

function displayTasks() {
    fetch('/tasks')
    .then(response => response.json())
    .then(data => {
        tasks = data;
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
    })
    .catch(error => console.error('Error:', error));
}

// Initial display of tasks when the page loads
displayTasks();
