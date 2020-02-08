const weatherText = document.querySelector(".weatherText");

const API_KEY = "bf6ec041776ba5058d57f63d4c35ba8b";
const COORDS = "coords";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature}ºC @${place}`;
    });
}

function onGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function onGeoError() {
  console.log("Can't access to geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
}

function saveCoords(coordsObj) {
  console.log(coordsObj);
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function loadCoords() {
  let loadedCords = localStorage.getItem(COORDS);
  if (loadedCords === null) {
    askForCoords();
  } else {
    loadedCords = JSON.parse(loadedCords);
    getWeather(loadedCords.latitude, loadedCords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
