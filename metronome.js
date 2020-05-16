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

// Links up metronome play and pause to space, and change tempo to left and right
document.addEventListener("keydown", (e) => {
  if (e.keyCode == "32") {
    toggleMetronome(bpmToCycle(bpmInput.value));
  } else if (e.keyCode == "37") {
    bpmRange.value--;
    setNumbers();
  } else if (e.keyCode == "39") {
    bpmRange.value++;
    setNumbers();
  }
});

button.addEventListener("click", function () {
  toggleMetronome(bpmToCycle(bpmInput.value));
});

bpmRange.addEventListener("input", setNumbers);

// Links range to the different display numbers, and sets circle size,
// converts tempo to cycle length, and changes metronome interval
function setNumbers() {
  displayNumber.innerHTML = bpmRange.value;
  bpmInput.value = bpmRange.value;
  setCircle(bpmInput.value);
  let cycleLength = bpmToCycle(bpmRange.value);
  changeMetronome(cycleLength);
}

// Similar to setNumbers, but works for inputting numbers into bpmInput
bpmInput.addEventListener("input", (e) => {
  let cycleLength = bpmToCycle(e.target.value);
  changeMetronome(cycleLength);
  setCircle(e.target.value);
  bpmRange.value = e.target.value;
  displayNumber.innerHTML = `${e.target.value}`;
});

// Changes the interval when the metronome is playing
function changeMetronome(cycleLength) {
  if (isPlaying) {
    clearInterval(interval);
    clearInterval(pulseInterval);
    interval = setInterval(playClick, cycleLength);
    setPulse(cycleLength);
  }
}

// Starts or stops the metronome with the passed cycle length
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
// Sets circle size, changes colour to red if input is outside of working
// metronome range
function setCircle(bpm) {
  if (bpm > 160 || bpm < 40) {
    innerCircle.setAttribute("fill", "crimson");
    innerCircle.setAttribute("r", 1.5 * bpm);
  } else {
    innerCircle.setAttribute("fill", "lightseagreen");
    innerCircle.setAttribute("r", 1.5 * bpm);
  }
}

// Sets the interval of the circle pulse to cycleLength, and invokes the pulse function
// with the parameter as cycleLength
function setPulse(cycleLength) {
  pulseInterval = setInterval(pulse, cycleLength, cycleLength);
}

// Sets a timeout for half of the cycleLength, when that occurs, the circle expands by
// 10px - setPulse and pulse are purely aesthetic
function pulse(cycleLength) {
  innerCircle.setAttribute("r", 1.5 * bpmInput.value);
  setTimeout(() => {
    innerCircle.setAttribute("r", 1.5 * bpmInput.value + 10);
  }, cycleLength / 2);
}
