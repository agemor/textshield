import Base64 from "../encoding/Base64";
import Utf8 from "../encoding/Utf8";

/**
 * Simple XOR cipher encryption 
 * 
 * @version 1.0.0
 * @author HyunJun Kim
 * @license MIT
 */
export class XorCipher {

  /**
   * Encrypt message
   * @param input 
   * @param key 
   */
  public static encrypt(input: string, key: string): string {
    // Mmessages are UTF-8 encoded 
    return Base64.encode(Utf8.encode(this.encode(input, key)));
  }

  /**
   * Decrypt message
   * @param input 
   * @param key 
   */
  public static decrypt(input: string, key: string) {
    return this.encode(Utf8.decode(Base64.decode(input)), key);
  }

  /**
   * Apply XOR between input and key
   * @param input 
   * @param key 
   */
  private static encode(input: string, key: string): string {
    let output = "";
    key = this.trimKey(key, input.length);
    for (let i = 0; i < input.length; i++) {
      output += String.fromCharCode(input.charCodeAt(i) ^ key.charCodeAt(i))
    }
    return output;
  }

  /**
   * Trim key size to fit message length
   * 
   * @param key 
   * @param length 
   */
  private static trimKey(key: string, length: number) {
    if (key.length > length) {
      key = key.substring(0, length);
    } else {
      // Round-copy
      for (let i = key.length; i < length; i++) {
        key += key.charAt(i - key.length);
      }
    }
    return key;
  }
}

export default XorCipher;