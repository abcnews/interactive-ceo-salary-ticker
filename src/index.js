const html = require("bel");
import { whenOdysseyLoaded } from "@abcnews/env-utils";
import { selectMounts } from "@abcnews/mount-utils";

const styles = require("./index.scss").default;

const START_TIME = new Date().getTime();
const CEO_PER_MILLISECOND = 4750326.6 / 31557600 / 1000; // milliseconds in a year
const WORKER_PER_MILLISECOND = 60900 / 31557600 / 1000;

function all(query) {
  return [].slice.call(document.querySelectorAll(query));
}

async function init() {
  await whenOdysseyLoaded;
  const mounts = selectMounts("salaryticker");

  // There will be only one anyway but...
  mounts.forEach((element) => {
    const ticker = html` <div class="${styles.base}">
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
    const milliseconds = new Date().getTime() - START_TIME;
    all("." + styles.ceoSalary).forEach(
      (el) =>
        (el.innerText = "$" + (milliseconds * CEO_PER_MILLISECOND).toFixed(2))
    );
    all("." + styles.workerSalary).forEach(
      (el) =>
        (el.innerText =
          "$" + (milliseconds * WORKER_PER_MILLISECOND).toFixed(2))
    );
  }, 16);
}

init();
