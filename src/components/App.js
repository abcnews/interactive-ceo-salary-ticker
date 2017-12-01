const { h, Component } = require('preact');
const styles = require('./App.scss');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: 0
    };
  }

  componentDidMount() {
    this.startTime = new Date().getTime();

    this.timer = setInterval(() => {
      this.setState(state => ({
        seconds: (new Date().getTime() - this.startTime) / 100
      }));
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render({ ceo, worker }) {
    const ceoPerSecond = ceo / 31557600 / 10; // seconds in a year
    const workerPerSecond = worker / 31557600 / 10;

    return (
      <div className={styles.base}>
        <p>Since you started reading this story, the average CEO has earned</p>
        <div className={styles.ceoSalary}>${(this.state.seconds * ceoPerSecond).toFixed(2)}</div>
        <p>Meanwhile, the average Australian has earned</p>
        <div className={styles.workerSalary}>${(this.state.seconds * workerPerSecond).toFixed(2)}</div>
      </div>
    );
  }
}

module.exports = App;
