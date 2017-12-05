const html = require('bel');

const styles = require('./index.scss');

const START_TIME = new Date().getTime();
const CEO_PER_SECOND = 4750326.6 / 31557600 / 10; // seconds in a year
const WORKER_PER_SECOND = 60900 / 31557600 / 10;

function all(query) {
  return [].slice.call(document.querySelectorAll(query));
}

function init() {
  all('[name^=salaryticker').forEach(element => {
    const ticker = html`
      <div class="${styles.base}">
        <p>Since you started reading this story, the average CEO has earned</p>
        <div class="${styles.ceoSalary}">$0.00</div>
        <p>Meanwhile, the average Australian has earned</p>
        <div class="${styles.workerSalary}">$0.00</div>
      </div>`;

    // Insert this new element
    element.parentNode.insertBefore(ticker, element);
  });

  // Count up
  setInterval(() => {
    const seconds = (new Date().getTime() - START_TIME) / 100;
    all('.' + styles.ceoSalary).forEach(el => (el.innerText = '$' + (seconds * CEO_PER_SECOND).toFixed(2)));
    all('.' + styles.workerSalary).forEach(el => (el.innerText = '$' + (seconds * WORKER_PER_SECOND).toFixed(2)));
  }, 100);
}

init();
