import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector("button[data-start]");
const input = document.querySelector("#datetime-picker");
const daysMs = document.querySelector("[data-days]");
const hoursMs = document.querySelector("[data-hours]");
const minutesMs = document.querySelector("[data-minutes]");
const secondsMs = document.querySelector("[data-seconds]");

let differentTime;
startBtn.disabled = true;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const userDate = new Date(selectedDates[0]).getTime();
    const startDate = Date.now();

    if (userDate >= startDate) {
      startBtn.disabled = false;
      differentTime = userDate - startDate;
      updateClockTime(convertMs(differentTime));
    } else {
      startBtn.disabled = true; 
      iziToast.error({
        close: false,
        position: 'topRight',
        messageColor: 'white',
        fontSize: 'large',
        backgroundColor: 'red',
        message: ("Please, choose a date in the future"),
        timeout: 2000  
     })
    }
  },
};

flatpickr('#datetime-picker', options);
input.value = ''; 

function zero(val) {
  return String(val).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = zero(Math.floor(ms / day));
  const hours = zero(Math.floor((ms % day) / hour));
  const minutes = zero(Math.floor(((ms % day) % hour) / minute));
  const seconds = zero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function updateClockTime({ days, hours, minutes, seconds }) {
  daysMs.textContent = `${days}`;
  hoursMs.textContent = `${hours}`;
  minutesMs.textContent = `${minutes}`;
  secondsMs.textContent = `${seconds}`;
}

let intervalId;

function startTimer(){
  clearInterval(intervalId);
  intervalId = setInterval(timer, 1000);
  startBtn.disabled = true;
  input.disabled = true;
}

function timer() {
  if (differentTime > 0) {
    differentTime = differentTime - 1000;
    updateClockTime(convertMs(differentTime));
  } else {
    clearInterval(intervalId);
    input.disabled = false;
  }
}

startBtn.addEventListener("click", startTimer);

