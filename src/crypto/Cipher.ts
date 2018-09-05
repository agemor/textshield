import Aes from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";

export default class Cipher {
  static encrypt(message: string, key: string): string {
    var ciphertext = Aes.encrypt(message, key);
    return ciphertext.toString();
  }

  static decrypt(message: string, key: string): string {
    var bytes = Aes.decrypt(message.toString(), "secret key 123");
    var plaintext = bytes.toString(Utf8);
    return plaintext.toString();
  }
}
