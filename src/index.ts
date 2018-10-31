import TextShield from "./TextShield";
import Encoder from "./Encoder";
import Decoder from "./Decoder";
import EncodedMessage from "./EncodedMessage";
import TextDisplay from "./TextDisplay";

// Add window module for encoding requirements
(<any>window).TextShieldEncoder = new Encoder();
(<any>window).TextShieldDecoder = new Decoder();
(<any>window).TextShieldEncodedMessage = EncodedMessage;

window.onload = function(): void {
  let textshield = new TextShield(document.body, null);
};

export default TextShield;
export { Encoder, Decoder, EncodedMessage, TextDisplay };
