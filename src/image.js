const body = document.querySelector("body");

const IMAGE_COUNT = 9;
let image;

function showImage(imageNumber) {
  image = new Image();
  image.addEventListener("loadend", onLoadEnd);
  body.appendChild(image);
  image.src = `images/${imageNumber + 1}.jpg`;
  //body.prepend(image);
}

function onLoadEnd() {
  image.classList.add("bgImage");
}

function generateRandomNumber() {
  const number = Math.floor(Math.random() * IMAGE_COUNT);
  return number;
}

function init() {
  showImage(generateRandomNumber());
}

init();
