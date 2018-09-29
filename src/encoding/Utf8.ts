/**
 * Basic Utf-8 encoder
 * 
 * @version 1.0.0
 * @author HyunJun Kim
 * @license MIT
 */
export class Utf8 {

  /**
   * Encode string into UTF-8 format
   * 
   * @param input 
   */
  public static encode(input: string): string {
    input = input.replace(/\r\n/g, "\n");
    let output = "";
    for (let i = 0; i < input.length; i++) {
      let c = input.charCodeAt(i);
      if (c < 128) {
        output += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        output += String.fromCharCode((c >> 6) | 192);
        output += String.fromCharCode((c & 63) | 128);
      } else {
        output += String.fromCharCode((c >> 12) | 224);
        output += String.fromCharCode(((c >> 6) & 63) | 128);
        output += String.fromCharCode((c & 63) | 128);
      }
    }
    return output;
  }

  /**
   * Decode UTF-8 string into displayable format
   * 
   * @param input 
   */
  public static decode(input: string): string {
    let output = "";
    let i = 0;
    let c1 = 0, c2 = 0, c3 = 0;
    while (i < input.length) {
      c1 = input.charCodeAt(i);
      if (c1 < 128) {
        output += String.fromCharCode(c1);
        i++;
      }
      else if ((c1 > 191) && (c1 < 224)) {
        c2 = input.charCodeAt(i + 1);
        output += String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
        i += 2;
      }
      else {
        c2 = input.charCodeAt(i + 1);
        c3 = input.charCodeAt(i + 2);
        output += String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return output;
  }
}

export default Utf8;