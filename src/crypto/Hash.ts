import Sha256 from "crypto-js/sha256";

export default class Hash {
  static digest(message: string): string {
    return Sha256(message).toString();
  }
}
