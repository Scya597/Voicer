import React, { Component } from 'react';
import key from 'keymaster';
import _ from 'lodash';
import Keyboard from '../utils/Audio';

let keys = '';
_.range(26).forEach((i) => {
  keys = keys.concat(String.fromCharCode(97 + i));
  if (i < 25) { keys = keys.concat(', '); }
});

class KeyMachine extends Component {
  constructor() {
    super();
    this.state = {};
    this.detectKeyboard = this.detectKeyboard.bind(this);
    this.keyboard = new Keyboard();
  }

  componentDidMount() {
    this.detectKeyboard();
  }

  detectKeyboard() {
    key(keys, (e, h) => {
      const char = (h.shortcut.charCodeAt(0) - 96).toString();
      this.keyboard.currentKey = char;
      this.keyboard.playKey();
    });
  }


  render() {
    const hide = {
      display: 'none',
    };

    return (
      <div>
        <div>
          <input
            type="text"
            style={hide}
            onKeyPress={this.detectKeyboard}
          />
        </div>
      </div>
    );
  }
}

export default KeyMachine;
