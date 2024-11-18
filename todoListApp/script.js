const inputBox = document.getElementById("input-box");
const searchBox = document.getElementById("search-box");
const addButton = document.getElementById("add-button");
const searchButton = document.getElementById("search-todo");
const listContainer = document.getElementById("list-container");


// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTaskElement(task));
}

// Function to save tasks to localStorage
function saveTasks() {
    const tasks = Array.from(listContainer.children).map(item => item.querySelector("span").textContent);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to create and display a task element
function createTaskElement(taskText) {
    const listItem = document.createElement("li");

    // Create span for task text
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    listItem.appendChild(taskSpan);

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.onclick = () => {
        listItem.remove();
        saveTasks(); // Update localStorage
    };

    listItem.appendChild(deleteButton);
    listContainer.appendChild(listItem);
}

// Function to add a new task
function addTask() {
    const taskText = inputBox.value.trim();
    if (taskText === "") {
        alert("You must write something!");
        return;
    }
    createTaskElement(taskText);
    saveTasks(); // Save to localStorage
    inputBox.value = ""; // Clear the input box
}

// Function to search tasks
function searchTask() {
    const query = searchBox.value.toLowerCase();
    const tasks = Array.from(listContainer.children);
    tasks.forEach(task => {
        const taskText = task.querySelector("span").textContent.toLowerCase();
        task.style.display = taskText.includes(query) ? "list-item" : "none";
    });
}

// Event listeners
addButton.addEventListener("click", addTask);
searchButton.addEventListener("click", searchTask);
document.addEventListener("DOMContentLoaded", loadTasks);





