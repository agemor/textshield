import { AES, enc } from "crypto-js";

export default class Hash {
  static encrypt(message: string, key: string): string {
    return AES.encrypt(message, key).toString();
  }

  static decrypt(message: string, key: string): string {
    return AES.decrypt(message, key).toString(enc.Utf8);
  }
}
