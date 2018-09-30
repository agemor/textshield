import EncodedMessage from "./EncodedMessage";
import Sha256 from "./crypto/Sha256";
import XorCipher from "./crypto/XorCipher";
import Base64 from "./encoding/Base64";

export enum DecodeCost {
  Zero = 0,
  Low = 0.2,
  Medium = 1,
  High = 5,
  VeryHigh = 25,
  Infinite = 125
}

/**
 * Textshield text code generator
 * 
 * @version 1.0.0
 * @author HyunJun Kim
 * @license MIT
 */
export class Encoder {
  public static NORMAL_HPS = 200;

  decodeCost: DecodeCost;
  salt: string;

  constructor(decodeCost = DecodeCost.Low, salt?: string) {
    this.decodeCost = decodeCost;
    this.salt = salt ? salt : this.generateRandomSalt();
  }

  public encode(message: string, randomSalt = false): EncodedMessage {
    // Renew salt
    if (randomSalt) this.generateRandomSalt();

    let key: string = this.salt + this.generateKey();
    let rkey: string = this.reverseString(key);
    let lock = Sha256.hash(key);
    let payload = XorCipher.encrypt(message, rkey);

    return new EncodedMessage(this.salt, lock, payload);
  }

  private generateKey(): number {
    let haystack = this.decodeCost * Encoder.NORMAL_HPS;
    let needle = this.randomIntegerBetween(Math.sqrt(haystack), haystack);
    return needle;
  }

  private generateRandomSalt(length = 16): string {
    let output = "";
    for (let i = 0; i < length; i++)
      output += Base64.CharacterTable.charAt(this.randomIntegerBetween(0, 64));
    return output;
  }

  private reverseString(string: string): string {
    return string
      .split("")
      .reverse()
      .join("");
  }

  private randomIntegerBetween(start: number, end: number): number {
    return Math.floor(Math.random() * (end + 1 - start) + start);
  }
}

export default Encoder;
