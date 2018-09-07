export class EncodedMessage {
  salt: string;
  lock: string;
  message: string;

  constructor(salt: string, lock: string, message: string) {
    this.salt = salt;
    this.lock = lock;
    this.message = message;
  }

  toString(): string {
    return this.salt + this.lock + this.message;
  }

  static parse(hex: string, saltSize = 32, lockSize = 64): EncodedMessage {
    let salt = hex.slice(0, saltSize);
    let lock = hex.slice(saltSize, saltSize + lockSize);
    let message = hex.slice(saltSize + lockSize);

    return new EncodedMessage(salt, lock, message);
  }
}

export default EncodedMessage;