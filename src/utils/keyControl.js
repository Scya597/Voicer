import { Compressor, Filter, Master, Freeverb, UserMedia, EQ3 } from 'tone';
import { keysNotes } from './keys.config';

const mic = new UserMedia();
mic.open().then(mic.toMaster());

const param = {
  eql: 0,
  eqm: 0, // min -15, max 15
  eqh: 0,
  threshold: -24, // [-100,0]
  ratio: 12, // [1,20]
  attack: 0.003, // [0,1]
  release: 0.25, // [0,1]
  filter: 2000,
  reverb: 50000,
};

const masterChain = (obj) => {
  const masterCompressor = new Compressor({
    'threshold': obj.threshold,
    'ratio': obj.ratio,
    'attack': obj.attack,
    'release': obj.release,
  });
  const lowBump = new Filter(obj.filter, 'lowshelf');
  const eq = new EQ3(obj.eql, obj.eqm, obj.eqh);
  const freeverb = new Freeverb();
  freeverb.dampening.value = obj.reverb;
  Master.chain(lowBump, masterCompressor, eq, freeverb);
  console.log('chained!!!');
};

masterChain(param);

export default class KeyControl {
  constructor() {
    this.currentKey = null;
    this.notes = keysNotes;
  }

  playKey() {
    if (this.currentKey !== null) {
      // set value
      switch (this.currentKey) {
        case '1': // A
          if (param.threshold + 1 <= 0) {
            param.threshold += 1;
          }
          break;
        case '19': // S
          if (param.threshold - 1 >= -100) {
            param.threshold -= 1;
          }
          break;
        case '17': // Q
          if (param.ratio + 1 <= 20) {
            param.ratio += 1;
          }
          break;
        case '23': // W
          if (param.ratio - 1 >= 0) {
            param.ratio -= 1;
          }
          break;
        case '26': // Z
          if (param.release + 0.05 <= 1) {
            param.release += 0.05;
          }
          break;
        case '24': // X
          if (param.release - 0.05 >= 0) {
            param.release -= 0.05;
          }
          break;
        case '9': // I
          if (param.eql + 1 <= 15) {
            param.eql += 1;
          }
          break;
        case '10': // J
          if (param.eql - 1 >= -15) {
            param.eql -= 1;
          }
          break;
        case '15': // O
          if (param.eqm + 1 <= 15) {
            param.eqm += 1;
          }
          break;
        case '11': // K
          if (param.eqm - 1 >= -15) {
            param.eqm -= 1;
          }
          break;
        case '16': // P
          if (param.eqh + 1 <= 15) {
            param.eqh += 1;
          }
          break;
        case '12': // L
          if (param.eqh - 1 >= -15) {
            param.eqh -= 1;
          }
          break;
        default:
          break;
      }
      masterChain(param);
      console.log(param); // number
      console.log(this.currentKey);
      this.currentKey = null;
    }
  }
}
