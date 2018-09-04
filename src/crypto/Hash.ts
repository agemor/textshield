import { SHA256 } from "crypto-js";

export default class Hash {
  static digest(message: string): string {
    return SHA256(message).toString();
  }
}
