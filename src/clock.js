const clock = document.querySelector(".clock");

function init() {
  updateTime();
  setInterval(updateTime, 1000);
}

function updateTime() {
  const currentDate = new Date();
  let hour = currentDate.getHours();
  let minute = currentDate.getMinutes();
  let second = currentDate.getSeconds();

  if (hour < 10) hour = "0" + hour;
  if (minute < 10) minute = "0" + minute;
  if (second < 10) second = "0" + second;

  clock.innerText = `${hour}:${minute}:${second}`;
}

init();
