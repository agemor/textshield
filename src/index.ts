import TextShield from "./TextShield";
import Encoder from "./Encoder";
import Decoder from "./Decoder";
import EncodedMessage from "./EncodedMessage";
import TextDisplay from "./TextDisplay";

// Add window module for encoding requirements
(<any>window).TextShieldEncoder = new Encoder();
(<any>window).TextShieldDecoder = new Decoder();
(<any>window).TextShieldEncodedMessage = EncodedMessage;

function load() {
  let textshield = new TextShield(document.body, null);
}

(<any>window).TextShieldLoad = load;

window.onload = function (): void {
  load();
};

export default TextShield;
export { Encoder, Decoder, EncodedMessage, TextDisplay };
