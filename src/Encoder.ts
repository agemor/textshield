import EncodedMessage from "./EncodedMessage";
import Sha256 from "./crypto/Sha256";
import XorCipher from "./crypto/XorCipher";
import Base64 from "./encoding/Base64";

/**
 * Pre-defined decode cost for user convinience
 * As browers normally terminate JavaScript runtime that exceeds over 10 secs,
 * decode cost of 125 is high enough to stop all executions.
 */
export enum DecodeCost {
  Zero = 0,
  Low = 0.2,
  Medium = 1,
  High = 5,
  VeryHigh = 25,
  Infinite = 125
}

/**
 * TextShield Text Encoder
 *
 * Generates random seed and natural number N based on given decode cost.
 * By these values, lock = H(seed + N) and payload = E(message, reverse(seed + N))
 * is calculated.
 *
 * @version 1.0.0
 * @author HyunJun Kim
 * @license MIT
 */
export class Encoder {
  // Average performance of usual processors to handle SHA-256 hash
  public static NORMAL_HPS = 200;

  public decodeCost: DecodeCost;
  public salt: string;

  constructor(decodeCost = DecodeCost.Low, salt?: string) {
    this.decodeCost = decodeCost;
    this.salt = salt ? salt : this.generateRandomSalt();
  }

  /**
   * Generate lock and payload baed on seed and N value
   *
   * @param message
   * @param randomSalt
   */
  public encode(message: string, randomSalt = false): EncodedMessage {
    // Renew salt
    if (randomSalt) this.salt = this.generateRandomSalt();

    let key: string = this.salt + this.generateKey();

    // To prevent linear prediction attack, reverse of hash key is used for encryption.
    let rkey: string = this.reverseString(key);
    let lock = Sha256.hash(key);
    let payload = XorCipher.encrypt(message, rkey);

    return new EncodedMessage(this.salt, lock, payload);
  }

  /**
   * Natural number N is selected
   */
  private generateKey(): number {
    let haystack = this.decodeCost * Encoder.NORMAL_HPS;
    let needle = this.randomIntegerBetween(Math.sqrt(haystack), haystack);
    return needle;
  }

  /**
   * Salt is generated using Base64 encoding charset
   *
   * @param length
   */
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
