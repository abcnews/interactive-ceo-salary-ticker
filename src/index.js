const html = require("bel");
import * as queryString from "query-string";
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

    // Get chart elements
    const chartElements = document.querySelectorAll(
      'a[href^="/news/interactives/chart"]'
    );

    // Replace them in page
    for (const element of chartElements) {
      const urlString = element.href;
      const searchString = urlString.substring(urlString.indexOf("?"));
      const query = queryString.parse(searchString);

      const iframe = html` <iframe
        src="https://www.abc.net.au/dat/news/interactives/graphics/${query.chart}/child.html"
        width="100%"
        frameborder="0"
        marginheight="0"
        scrolling="no"
        crossorigin="anonymous"
        height="${query.chart === "2017-ceo-pay"
          ? 211
          : query.chart === "20171205-ceo-pay-rises"
          ? 384
          : query.chart === "20171205-ceo-gender-gap"
          ? 245
          : query.chart === "20171205-top-ceos-pay"
          ? 615
          : 0}px"
      >
      </iframe>`;

      element.parentNode.replaceChild(iframe, element);
    }

    // Resize to fix charts
    // Not working even though same origin
    // TODO: Fix later, for now manually set
    // setTimeout(() => {
    //   try {
    //     const iframes = document.querySelectorAll("iframe");
    //     for (let i = 0; i < iframes.length; i++) {
    //       resizeIFrameToFitContent(iframes[i]);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }, 500);
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

// function resizeIFrameToFitContent(iFrame) {
//   iFrame.height = iFrame.contentWindow.document.body.scrollHeight;
// }
