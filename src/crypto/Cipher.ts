import Aes from "crypto-js/aes";
import Ctr from "crypto-js/mode-ctr";
import Utf8 from "crypto-js/enc-utf8";
import Hex from "crypto-js/enc-hex";
import Base64 from "crypto-js/enc-base64";
import NoPadding from "crypto-js/pad-nopadding";

export default class Cipher {
  static encrypt(message: string, key: string): string {
    let cipherText = Aes.encrypt(message, key, {
      mode: Ctr,
      padding: NoPadding
    }).toString();
    return Base64.parse(cipherText).toString(Hex);
  }

  static decrypt(message: string, key: string): string {
    var bytes = Aes.decrypt(Hex.parse(message).toString(Base64), key, {
      mode: Ctr,
      padding: NoPadding
    });
    var plainText = bytes.toString(Utf8);
    return plainText.toString();
  }
}
