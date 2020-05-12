const button = document.querySelector("button");
const bpmInput = document.querySelector(".form-control");
const bpmRange = document.querySelector(".custom-range");
const displayNumber = document.querySelector(".display-number");
let interval = null;
let isPlaying = false;
const click = new Audio("tick.mp3");
let cycleLength = 1000;

const bpmToCycle = (num) => 60000 / num;
const playClick = () => click.play();

button.addEventListener("click", toggleMetronome);

bpmRange.addEventListener("input", () => {
  displayNumber.innerHTML = bpmRange.value;
  bpmInput.value = bpmRange.value;
  let cycleLength = bpmToCycle(bpmRange.value);
  changeMetronome(cycleLength);
});

bpmInput.addEventListener("input", (e) => {
  let cycleLength = bpmToCycle(e.target.value);
  changeMetronome(cycleLength);
  displayNumber.innerHTML = `${e.target.value}`;
});

function changeMetronome(cycleLength) {
  if (isPlaying) {
    clearInterval(interval);
    interval = setInterval(playClick, cycleLength);
    setPulse();
  }
}

function toggleMetronome(cycleLength) {
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
