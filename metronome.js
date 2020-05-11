const button = document.querySelector("button");
let interval = null;
let isPlaying = false;
const click = new Audio("tick.mp3");

button.addEventListener("click", toggleMetronome);

function toggleMetronome() {
  if (isPlaying) {
    isPlaying = false;
    clearInterval(interval);
  } else {
    isPlaying = true;
    interval = setInterval(playclick, 50);
  }
}

const playclick = () => click.play();
