const body = document.querySelector("body");

const IMAGE_COUNT = 3;

function showImage(imageNumber) {
  const image = new Image();
  image.src = `images/${imageNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
}

function generateRandomNumber() {
  const number = Math.floor(Math.random() * IMAGE_COUNT);
  return number;
}

function init() {
  showImage(generateRandomNumber());
}

init();
