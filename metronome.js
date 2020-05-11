const button = document.querySelector("button");
const bpmInput = document.querySelector("input");
let interval = null;
let isPlaying = false;
const click = new Audio("tick.mp3");
let cycleLength = 1000;

const bpmToCycle = (num) => 60000 / num;
const playClick = () => click.play();

button.addEventListener("click", toggleMetronome);

//this needs sorting
bpmInput.addEventListener("input", (e) => {
  console.log(e);
});

function toggleMetronome() {
  if (isPlaying) {
    isPlaying = false;
    button.innerHTML = "Start metronome";
    setPulse();
    clearInterval(interval);
  } else {
    isPlaying = true;
    button.innerHTML = "Stop metronome";
    setPulse();
    interval = setInterval(playClick, cycleLength);
  }
}

function setPulse() {
  // set a pulsating animation for the inner svg circle
}
