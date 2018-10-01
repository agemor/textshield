/**
 * TextShield Encoded Message Format
 *
 * Stores basic properties of encoded TextShield text
 * It also performs basic parsing to acquire
 * three components(salt, lock and payload) from raw HTML string.
 */
export class EncodedMessage {
  salt: string;
  lock: string;
  message: string; // payload

  constructor(salt: string, lock: string, message: string) {
    this.salt = salt;
    this.lock = lock;
    this.message = message;
  }

  toString(): string {
    return this.salt + this.lock + this.message;
  }

  /**
   * Extract three component (salt, lock, and payload) from given string
   *
   * @param hex
   * @param saltSize
   * @param lockSize
   */
  static parse(hex: string, saltSize = 16, lockSize = 44): EncodedMessage {
    if (hex.length <= saltSize + lockSize) {
      return null;
    }

    let salt = hex.slice(0, saltSize);
    let lock = hex.slice(saltSize, saltSize + lockSize);
    let message = hex.slice(saltSize + lockSize);

    return new EncodedMessage(salt, lock, message);
  }
}

export default EncodedMessage;
