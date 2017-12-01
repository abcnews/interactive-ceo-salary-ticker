const { h, render } = require('preact');

const PROJECT_NAME = 'interactive-ceo-salary-ticker';
const root = document.querySelector(`[data-${PROJECT_NAME}-root]`);

function init() {
  const App = require('./components/App');
  render(<App ceo={4750326.6} worker={60900} />, root, root.firstChild);
}

init();

if (module.hot) {
  module.hot.accept('./components/App', () => {
    try {
      init();
    } catch (err) {
      const ErrorBox = require('./components/ErrorBox');
      render(<ErrorBox error={err} />, root, root.firstChild);
    }
  });
}

if (process.env.NODE_ENV === 'development') {
  require('preact/devtools');
  console.debug(`[${PROJECT_NAME}] public path: ${__webpack_public_path__}`);
}
