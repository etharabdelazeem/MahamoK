const todoList = document.getElementById('todo-list');
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');

let tasks = [];

const deleteIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width    ="24px" fill="red" ><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0     33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720    v520-520Z"/></svg`;

if (localStorage.getItem('mahamok-tasks')) {
  try {
    tasks = JSON.parse(localStorage.getItem('mahamok-tasks'));
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    tasks = [];
  }
}

function renderTasks() {
  todoList.innerHTML = '';
  tasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.innerText = task.text;

    listItem.addEventListener('click', () => {
      task.completed = !task.completed;
      listItem.classList.toggle('completed');
      saveTasks();
    });

    const deleteButton = document.createElement('span');
    deleteButton.classList.add('delete-btn');
    deleteButton.innerHTML = deleteIconSVG; 
    deleteButton.addEventListener('click', () => {
      const taskIndex = tasks.indexOf(task);
      tasks.splice(taskIndex, 1);
      renderTasks();
      saveTasks();
    });

    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);

    if (task.completed) {
      listItem.classList.add('completed');
    }
  });
}

function saveTasks() {
  localStorage.setItem('mahamok-tasks', JSON.stringify(tasks));
}

addTaskButton.addEventListener('click', () => {
  const newTask = newTaskInput.value.trim();
  if (newTask) {
    tasks.push({ text: newTask, completed: false });
    renderTasks();
    newTaskInput.value = '';
    saveTasks();
  }
});

renderTasks();
