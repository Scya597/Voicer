import { Players, Compressor, Filter, Master, Freeverb, UserMedia, Waveform } from 'tone';
import { keysUrls, keysNotes } from './keys.config';

// const masterCompressor = new Compressor({
//   'threshold': 600,
//   'ratio': 30,
//   'attack': 0.5,
//   'release': 0.1
// });
//
// const lowBump = new Filter(2000, 'lowshelf');
//
// const freeverb = new Freeverb().toMaster();

const compress = () => {
  const masterCompressor = new Compressor({
    'threshold': -50,
    'ratio': 10,
    'attack': 0.5,
    'release': 0.1,
  });
  const lowBump = new Filter(2000, 'lowshelf');
  Master.chain(lowBump, masterCompressor);
  const freeverb = new Freeverb().toMaster();
  freeverb.dampening.value = 0;
  console.log('f');
};

compress();

const mic = new UserMedia();
const analyser = new Waveform(256);
mic.connect(analyser);
mic.open().then(() => console.log('fuffd'));

export default class Sound {
  notes: Array<String>;
  samples: Object;
  constructor() {
    this.currentKey = null;
    this.notes = keysNotes;
    this.samples = new Players(keysUrls[0]).toMaster();
  }

  playKey() {
    if (this.currentKey !== null) {
      // compress();
      // this.samples._players[this.notes[this.currentKey]].start();
      this.currentKey = null;
    }
  }
}
