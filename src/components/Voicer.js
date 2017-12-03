import React, { Component } from 'react';
import key from 'keymaster';
import _ from 'lodash';
import KeyControl from '../utils/keyControl';
import PieChart from './PieChart';
import '../scss/style.scss';


let keys = '';
_.range(26).forEach((i) => {
  keys = keys.concat(String.fromCharCode(97 + i));
  if (i < 25) { keys = keys.concat(', '); }
});
const limit = {
  threshold: [-100, 0],
  ratio: [1, 20],
  release: [0, 1],
  eql: [-15, 15],
};

class Voicer extends Component {
  constructor() {
    super();
    this.state = {
      pitch: 0,       // [-12,  12]
      eql: 0,
      eqm: 0,         // [-15,  15]
      eqh: 0,
      threshold: -24, // [-100, 0]
      ratio: 12,      // [1,    20]
      attack: 0.003,  // [0,    1]
      release: 0.25,  // [0,    1]
      filter: 2000,
      reverb: 50000,
    };
    this.detectKeyboard = this.detectKeyboard.bind(this);
    this.keyboard = new KeyControl();
  }

  componentDidMount() {
    this.detectKeyboard();
  }

  detectKeyboard() {
    key(keys, (e, h) => {
      const char = (h.shortcut.charCodeAt(0) - 96).toString();
      this.keyboard.currentKey = char;
      this.keyboard.playKey(this.setState.bind(this));
    });
  }

  render() {
    const hide = {
      display: 'none',
    };
    const perc = {
      threshold: (this.state.threshold - limit.threshold[0]) / (limit.threshold[1] - limit.threshold[0]), // [-100,0]
      ratio: (this.state.ratio - limit.ratio[0]) / (limit.ratio[1] - limit.ratio[0]),
      release: (this.state.release - limit.release[0]) / (limit.release[1] - limit.release[0]),
      eql: (this.state.eql - limit.eql[0]) / (limit.eql[1] - limit.eql[0]),
    };

    return (
      <div className="container">
        <div style={hide}>
          <input
            type="text"
            onKeyPress={this.detectKeyboard}
          />
        </div>
        <PieChart perc={perc.threshold} Ascii={['A','S']} name="Thereshold" />
        <PieChart perc={perc.ratio} Ascii={['Q','W']} name="Ratio"/>
        <PieChart perc={perc.release} Ascii={['Z','X']} name="Release"/>
        <PieChart perc={perc.eql} Ascii={['I','J']} name="Eql"/>
      </div>
    );
  }
}

export default Voicer;
