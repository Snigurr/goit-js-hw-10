import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const { delay, state } = form; 

  const promise = new Promise((resolve, reject) => {
    const delayValue = Number(delay.value);

    setTimeout(() => {
      if (state.value === 'fulfilled') {
        resolve(delayValue);
      } else if (state.value === 'rejected') {
        reject(delayValue);
      }
    }, delayValue);
  });

  promise.then(delay => {
    iziToast.success({
      title: 'Success',
      message: `✅ Fulfilled promise in ${delay}ms`,
      position: 'topCenter',
    });
    form.reset(); 
  }).catch(delay => {
    iziToast.error({
      title: 'Error',
      message: `❌ Rejected promise in ${delay}ms`,
      position: 'topCenter',
    });
    form.reset(); 
  });
});



