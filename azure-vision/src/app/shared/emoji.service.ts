import { Injectable } from '@angular/core';
import { Emotions } from './emotions.model';

@Injectable({
  providedIn: 'root'
})
export class EmojiService {

  public smile = String.fromCodePoint(0x1F60A);
  public angry = String.fromCodePoint(0x1F621);
  public sad = String.fromCodePoint(0x1F614);
  public cry = String.fromCodePoint(0x1F622);
  public surprise = String.fromCodePoint(0x1F632);
  public neutral = String.fromCodePoint(0x1F610);
  public fear = String.fromCodePoint(0x1F631);
  public contempt = String.fromCodePoint(0x1F612);
  public unknown = String.fromCodePoint(0x2753);

  constructor() { }

  public getEmoji(emotions: Emotions) {
    if (emotions.happiness > 0.6) {
      return this.smile;
    }
    if (emotions.anger > 0.6) {
      return this.angry;
    }
    if (emotions.contempt > 0.6) {
      return this.contempt;
    }
    if (emotions.disgust > 0.6) {
      return this.sad;
    }
    if (emotions.fear > 0.6) {
      return this.fear;
    }
    if (emotions.sadness > 0.6) {
      return this.sad;
    }
    if (emotions.neutral > 0.6) {
      return this.neutral;
    }
    if (emotions.surprise > 0.6) {
      return this.surprise;
    }
    return this.unknown;
  }
}
