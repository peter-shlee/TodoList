const KEY_OF_LOCAL_STORAGE_TASK_LIST = "pending_list";

const todoForm = document.querySelector(".toDoForm");
const toDoInput = todoForm.querySelector("input");
const htmlPendingList = document.querySelector(".pendingList");
const htmlFinishedList = document.querySelector(".finishedList");
let taskList;

function init() {
  todoForm.addEventListener("submit", onSubmit);

  taskList = loadToDoList(KEY_OF_LOCAL_STORAGE_TASK_LIST);
  if (taskList != null) {
    showAllTasks(taskList);
  } else {
    taskList = [];
  }
}

function saveToDoList(toDoList) {
  localStorage.setItem(
    KEY_OF_LOCAL_STORAGE_TASK_LIST,
    JSON.stringify(toDoList)
  );
}

function loadToDoList() {
  return JSON.parse(localStorage.getItem(KEY_OF_LOCAL_STORAGE_TASK_LIST));
}

function onSubmit(event) {
  event.preventDefault();
  const task = {
    id: Symbol(),
    name: toDoInput.value,
    isFinished: false
  };
  taskList.push(task);
  saveToDoList(taskList);
  addTaskToHtml(task);
  toDoInput.value = null;
}

function createDeleteButton(task) {
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "❌";
  deleteButton.addEventListener("click", function(event) {
    const index = taskList.indexOf(task);
    taskList.splice(index, 1);
    saveToDoList(taskList);

    const this_li = event.target.parentNode;
    if (task.isFinished) {
      htmlFinishedList.removeChild(this_li);
    } else {
      htmlPendingList.removeChild(this_li);
    }
  });

  return deleteButton;
}

function createFinishedButton(task) {
  const finishedButton = document.createElement("button");
  finishedButton.addEventListener("click", function(event) {
    const this_li = event.target.parentNode;
    if (task.isFinished) {
      finishedButton.innerText = "⬜";
      htmlPendingList.appendChild(this_li);
    } else {
      finishedButton.innerText = "✅";
      htmlFinishedList.appendChild(this_li);
    }
    task.isFinished = !task.isFinished;
    saveToDoList(taskList);
  });

  return finishedButton;
}

function addTaskToHtml(task) {
  const li = document.createElement("li");

  const deleteButton = createDeleteButton(task);

  const finishedButton = createFinishedButton(task);

  const span = document.createElement("span");
  span.innerText = task.name;

  li.appendChild(span);
  li.appendChild(deleteButton);
  li.appendChild(finishedButton);

  if (task.isFinished) {
    finishedButton.innerText = "✅";
    htmlFinishedList.appendChild(li);
  } else {
    finishedButton.innerText = "⬜";
    htmlPendingList.appendChild(li);
  }
}

function showAllTasks(taskList) {
  for (let i = 0; i < taskList.length; ++i) {
    addTaskToHtml(taskList[i]);
  }
}

init();
