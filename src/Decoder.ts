import EncodedMessage from "./EncodedMessage";
import Sha256 from "./crypto/Sha256";
import XorCipher from "./crypto/XorCipher";

/**
 * Textshield Decoder
 * Decoder resolves SHA-256 hash that matches message lock value
 *
 * @version 1.0.0
 * @author HyunJun Kim
 * @license MIT
 */
export class Decoder {
  public static MAX_ATTEMPTS = 100000000;

  constructor() {}

  /**
   * Decode message in EncodedMessage format
   * It tries the maximum of MAX_ATTEMPT times to resolve given hash value.
   * If matching hash value is found, payload is decoded into original string and returned
   *
   * @param encodedMessage
   */
  decode(encodedMessage: EncodedMessage): string {
    // Resolve hash value until it hits fail
    let needle = this.resolveHash(encodedMessage.salt, encodedMessage.lock);
    if (needle < 0) return null;

    let key = encodedMessage.salt + needle;

    // Payload encryption key is reverse of hash key
    let rkey = this.reverseString(key);

    let decodedMessage = XorCipher.decrypt(encodedMessage.message, rkey);

    return decodedMessage;
  }

  /**
   * Try resolve the hash that matches H(salt + N) = lock
   *
   * @param salt
   * @param lock
   */
  private resolveHash(salt: string, lock: string): number {
    let count = 0;
    while (count < Decoder.MAX_ATTEMPTS) {
      if (Sha256.hash(salt + count) == lock) {
        return count;
      }
      count++;
    }
    // No match found!
    return -1;
  }

  private reverseString(string: string): string {
    return string
      .split("")
      .reverse()
      .join("");
  }
}

export default Decoder;
