import EncodedMessage from "./EncodedMessage";
import Hash from "./crypto/Hash";
import Cipher from "./crypto/Cipher";

export class Decoder {

  public static MAX_ATTEMPTS = 3000;

  constructor() {

  }

  decode(encodedMessage: EncodedMessage): string {
    let needle = this.resolveHash(encodedMessage.salt, encodedMessage.lock);
    if (needle < 0) return null;

    let key = encodedMessage.salt + needle;
    let rkey = this.reverseString(key);

    let decodedMessage = Cipher.decrypt(encodedMessage.message, rkey);

    return decodedMessage;
  }

  private resolveHash(salt: string, lock: string): number {
    let count = 0;
    while (count < Decoder.MAX_ATTEMPTS) {
      if (Hash.digest(salt + count) == lock) {
        return count;
      }
      count++;
    }
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