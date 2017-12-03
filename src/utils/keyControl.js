import { Compressor, Filter, Master, Freeverb, UserMedia, EQ3 } from 'tone';
import { keysNotes } from './keys.config';

const mic = new UserMedia();
mic.open().then(mic.toMaster());


export const param = {
  threshold: -24, // [-100,0]
  ratio: 12, // [1,20]
  attack: 0.003, // [0,1]
  release: 0.25, // [0,1]
  filter: 2000,
  reverb: 50000,
  eql: -10,
  eqm: 3, // max 767
  eqh: -20,
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
  const eq = new EQ3(obj.eql, obj.eqm, obj.eqh);
  eq.toMaster();
};

compress(param);

export default class KeyControl {
  constructor() {
    this.currentKey = null;
    this.notes = keysNotes;
  }

  playKey(settingState) {
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
        case '9':
          if (param.eql + 3 >= 500) {
            param.eql += 3;
          }
          break;
        case '10':
          if (param.eql - 3 >= -100) {
            param.eql -= 3;
          }
          break;
        case '15':
          if (param.eqm + 3 <= 500) {
            param.eqm += 3;
          }
          break;
        case '11':
          if (param.eqm - 3 >= -100) {
            param.eqm -= 3;
          }
          break;
        case '16':
          if (param.eqh + 3 <= 500) {
            param.eqh += 3;
          }
          break;
        case '12':
          if (param.eqh - 3 >= -100) {
            param.eqh -= 3;
          }
          break;
        default:
          break;
      }
      settingState({
        threshold: param.threshold, // [-100,0]
        ratio: param.ratio, // [1,20]
        attack: param.attack, // [0,1]
        release: param.release, // [0,1]
        filter: param.filter,
        reverb: param.reverb,
        eql: param.eql,
        eqm: param.eqm, // max 767
        eqh: param.eqh,
      });
      this.currentKey = null;
    }
  }
}
