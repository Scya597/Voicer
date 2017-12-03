import { Compressor, Filter, Master, Freeverb, UserMedia } from 'tone';
import { keysNotes } from './keys.config';

const mic = new UserMedia();
mic.open().then(mic.toMaster());

const param = {
  threshold: -24, // [-100,0]
  ratio: 12, // [1,20]
  attack: 0.003, // [0,1]
  release: 0.25, // [0,1]
  filter: 2000,
  reverb: 50000,
};

const compress = (obj) => {
  const masterCompressor = new Compressor({
    'threshold': obj.threshold,
    'ratio': obj.ratio,
    'attack': obj.attack,
    'release': obj.release,
  });
  const lowBump = new Filter(obj.filter, 'lowshelf');
  Master.chain(lowBump, masterCompressor);
  const freeverb = new Freeverb().toMaster();
  freeverb.dampening.value = obj.reverb;
  console.log('compress!!!');
};

compress(param);

export default class KeyControl {
  constructor() {
    this.currentKey = null;
    this.notes = keysNotes;
  }

  playKey() {
    if (this.currentKey !== null) {
      // set value
      switch (this.currentKey) {
        case '1':
          if (param.threshold + 1 <= 0) {
            param.threshold += 1;
          }
          break;
        case '19':
          if (param.threshold - 1 >= -100) {
            param.threshold -= 1;
          }
          break;
        case '17':
          if (param.ratio + 1 <= 20) {
            param.ratio += 1;
          }
          break;
        case '23':
          if (param.ratio - 1 >= 0) {
            param.ratio -= 1;
          }
          break;
        case '26':
          if (param.release + 0.05 <= 1) {
            param.release += 0.05;
          }
          break;
        case '24':
          if (param.release - 0.05 >= 0) {
            param.release -= 0.05;
          }
          break;
        default:
          break;
      }
      console.log(param); // number
      console.log(this.currentKey);
      this.currentKey = null;
    }
  }
}
