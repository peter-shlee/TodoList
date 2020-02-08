const greetingForm = document.querySelector(".greetingForm");
const nameInput = greetingForm.querySelector(".nameInput");
const greetingText = document.querySelector(".greetingText");
const task = document.querySelector(".task");
const taskForm = task.querySelector(".taskForm");
const weather = document.querySelector(".weather");

const SHOWING_CN = "showing";

const NAME_KEY = "name";

function init() {
  loadName();
}

function loadName() {
  const name = localStorage.getItem(NAME_KEY);
  if (name === null) {
    askForName();
  } else {
    showGreetingText(name);
    greetingForm.disable = true;
    showToDoListAndWeather();
  }
}

function askForName() {
  greetingForm.classList.add(SHOWING_CN);
  greetingForm.addEventListener("submit", onNameSubmit);
}

function showGreetingText(name) {
  greetingForm.classList.remove(SHOWING_CN);
  greetingText.classList.add(SHOWING_CN);
  greetingText.innerText = "Hello " + name;
}

function onNameSubmit(event) {
  event.preventDefault();
  const name = nameInput.value;
  console.log(name);
  saveName(name);
  showGreetingText(name);
  showToDoListAndWeather();
}

function saveName(name) {
  localStorage.setItem(NAME_KEY, name);
}

function showToDoListAndWeather() {
  task.classList.add(SHOWING_CN);
  taskForm.disable = false;
  weather.classList.add(SHOWING_CN);
}

init();
