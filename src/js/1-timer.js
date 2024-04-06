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

let userDate; 

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (userDate < Date.now()) {
      startBtn.disabled = true; 
      iziToast.error({
        close: false,
        position: 'topRight',
        messageColor: 'white',
        fontSize: 'large',
        backgroundColor: 'red',
        message: "Please, choose a date in the future",
        timeout: 2000  
      })
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function zero(val) {
  return String(val).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateClockTime({ days, hours, minutes, seconds }) {
  daysMs.textContent = zero(days);
  hoursMs.textContent = zero(hours);
  minutesMs.textContent = zero(minutes);
  secondsMs.textContent = zero(seconds);
}

let intervalId;

function startTimer() {
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    const currentDate = Date.now();
    if (userDate > currentDate) {
      const timeDifference = userDate - currentDate;
      updateClockTime(convertMs(timeDifference));
    } else {
      clearInterval(intervalId);
      startBtn.disabled = true;
    }
  }, 1000);

  startBtn.disabled = true;
  input.disabled = true;
}

startBtn.addEventListener("click", startTimer);


input.addEventListener('change', () => {
  userDate = new Date(input.value).getTime();
});



