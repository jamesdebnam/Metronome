const button = document.querySelector("button");
const bpmInput = document.querySelector(".form-control");
const bpmRange = document.querySelector(".custom-range");
const displayNumber = document.querySelector(".display-number");
const innerCircle = document.querySelector("#inner-circle");
let interval = null;
let isPlaying = false;
const click = new Audio("tick.mp3");
let pulseInterval;
displayNumber.innerHTML = bpmInput.value;

const bpmToCycle = (num) => 60000 / num;
const playClick = () => click.play();

let cycleLength;

document.addEventListener("keydown", (e) => {
  if (e.keyCode == "32") {
    toggleMetronome(bpmToCycle(bpmInput.value));
  } else if (e.keyCode == "37") {
    bpmRange.value--;
    displayNumber.innerHTML = bpmRange.value;
    bpmInput.value = bpmRange.value;
    setCircle(bpmInput.value);
    let cycleLength = bpmToCycle(bpmRange.value);
    changeMetronome(cycleLength);
  } else if (e.keyCode == "39") {
    bpmRange.value++;
    displayNumber.innerHTML = bpmRange.value;
    bpmInput.value = bpmRange.value;
    setCircle(bpmInput.value);
    let cycleLength = bpmToCycle(bpmRange.value);
    changeMetronome(cycleLength);
  }
});

button.addEventListener("click", function () {
  toggleMetronome(bpmToCycle(bpmInput.value));
});

bpmRange.addEventListener("input", () => {
  displayNumber.innerHTML = bpmRange.value;
  bpmInput.value = bpmRange.value;
  setCircle(bpmInput.value);
  let cycleLength = bpmToCycle(bpmRange.value);
  changeMetronome(cycleLength);
});

bpmInput.addEventListener("input", (e) => {
  let cycleLength = bpmToCycle(e.target.value);
  changeMetronome(cycleLength);
  setCircle(e.target.value);
  bpmRange.value = e.target.value;
  displayNumber.innerHTML = `${e.target.value}`;
});

function changeMetronome(cycleLength) {
  if (isPlaying) {
    clearInterval(interval);
    clearInterval(pulseInterval);
    interval = setInterval(playClick, cycleLength);
    setPulse(cycleLength);
  }
}

function toggleMetronome(cycleLength) {
  if (isPlaying) {
    isPlaying = false;
    button.innerHTML = "Start metronome";
    clearInterval(pulseInterval);
    clearInterval(interval);
  } else {
    console.log("sfdds");

    isPlaying = true;
    button.innerHTML = "Stop metronome";
    setPulse(cycleLength);
    interval = setInterval(playClick, cycleLength);
  }
}
function setCircle(bpm) {
  if (bpm > 160 || bpm < 40) {
    innerCircle.setAttribute("fill", "crimson");
    innerCircle.setAttribute("r", 1.5 * bpm);
  } else {
    innerCircle.setAttribute("fill", "lightseagreen");
    innerCircle.setAttribute("r", 1.5 * bpm);
  }
}

function setPulse(cycleLength) {
  pulseInterval = setInterval(pulse, cycleLength, cycleLength);
}

function pulse(cycleLength) {
  innerCircle.setAttribute("r", 1.5 * bpmInput.value);
  setTimeout(() => {
    innerCircle.setAttribute("r", 1.5 * bpmInput.value + 10);
  }, cycleLength / 2);
}
