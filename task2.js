// task3.js
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById("display");
const laps = document.getElementById("laps");
const startPauseBtn = document.getElementById("startPauseBtn");

function updateTime() {
  const time = Date.now() - startTime + elapsedTime;
  const hours = Math.floor(time / 3600000).toString().padStart(2, '0');
  const minutes = Math.floor((time % 3600000) / 60000).toString().padStart(2, '0');
  const seconds = Math.floor((time % 60000) / 1000).toString().padStart(2, '0');
  const milliseconds = Math.floor((time % 1000) / 10).toString().padStart(2, '0');
  display.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function startPause() {
  if (!isRunning) {
    startTime = Date.now();
    timerInterval = setInterval(updateTime, 10);
    startPauseBtn.textContent = "⏸ Pause";
    isRunning = true;
  } else {
    clearInterval(timerInterval);
    elapsedTime += Date.now() - startTime;
    isRunning = false;
    startPauseBtn.textContent = "▶ Start";
  }
}

function reset() {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  display.textContent = "00:00:00.00";
  laps.innerHTML = "";
  startPauseBtn.textContent = "▶ Start";
}

function recordLap() {
  if (!isRunning) return;

  const currentTime = Date.now() - startTime + elapsedTime;
  const lapHours = Math.floor(currentTime / 3600000).toString().padStart(2, '0');
  const lapMinutes = Math.floor((currentTime % 3600000) / 60000).toString().padStart(2, '0');
  const lapSeconds = Math.floor((currentTime % 60000) / 1000).toString().padStart(2, '0');
  const lapMilliseconds = Math.floor((currentTime % 1000) / 10).toString().padStart(2, '0');

  const lapItem = document.createElement("li");
  lapItem.textContent = `Lap ${laps.children.length + 1}: ${lapHours}:${lapMinutes}:${lapSeconds}.${lapMilliseconds}`;
  laps.appendChild(lapItem);
}
