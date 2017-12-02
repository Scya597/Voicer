import { Players } from 'tone';
import { keysUrls, keysNotes } from './keys.config';

export default class Keyboard {
  notes: Array<String>;
  samples: Object;

  constructor() {
    this.currentKey = null;
    this.notes = keysNotes;
    this.samples = new Players(keysUrls[0]).toMaster();
  }

  playKey() {
    if (this.currentKey !== null) {
      this.samples._players[this.notes[this.currentKey]].start();
      this.currentKey = null;
    }
  }
}
