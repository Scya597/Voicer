import { Compressor, Filter, Master, Freeverb, UserMedia, EQ3, PitchShift, StereoWidener } from 'tone';
import { keysNotes } from './keys.config';

const mic = new UserMedia();
mic.open().then(mic.toMaster());

export const param = {
  pitch: 0,       // [-12,  12]
  width: 0.5,     // [0,    1]
  reverb: 10000,   // [2000,    100000]
  eql: 0,
  eqm: 0,         // [-15,  15]
  eqh: -15,
  threshold: -24, // [-100, 0]
  ratio: 12,      // [1,    20]
  attack: 0.003,  // [0,    1]
  release: 0.25,  // [0,    1]
  filter: 2000,
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
  const freeverb = new Freeverb({'dampening': obj.reverb});
  const pitch = new PitchShift({'pitch': obj.pitch});
  const stereoWidener = new StereoWidener(obj.width);
  Master.chain(lowBump, masterCompressor, eq, freeverb, pitch, stereoWidener);
  console.log('chained!!!');
};

masterChain(param);

export default class KeyControl {
  constructor() {
    this.currentKey = null;
    this.notes = keysNotes;
  }

  playKey(settingState) {
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
        case '4': // D
          if (param.pitch + 1 <= 12) {
            param.pitch += 1;
          }
          break;
        case '6': // F
          if (param.pitch - 1 >= -12) {
            param.pitch -= 1;
          }
          break;
        case '3': // C
          if (param.width + 0.1 <= 1) {
            param.width += 0.1;
          }
          break;
        case '22': // V
          if (param.width - 0.1 >= 0) {
            param.width -= 0.1;
          }
          break;
        case '5': // E
          if (param.reverb * 1.1 <= 100000) {
            param.reverb *= 1.1;
          }
          break;
        case '18': // R
          if (param.reverb * 0.9 >= 2000) {
            param.reverb *= 0.9;
          }
          break;
        default:
          break;
      }
      masterChain(param);
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
        pitch: param.pitch,
      });
      this.currentKey = null;
    }
  }
}
