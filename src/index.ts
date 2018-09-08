
import Textshield from "./Textshield";
/*
import Encoder from "./Encoder";
import Decoder from "./Decoder";
import EncodedMessage from "./EncodedMessage";

let encoder = new Encoder();
let decoder = new Decoder();

let enc = encoder.encode("hello", true).toString();

console.log(enc);

let dec = decoder.decode(EncodedMessage.parse(enc));

console.log(dec);
*/

window.onload = function (): void {
    let textshield = new Textshield(document.body, null);
}
