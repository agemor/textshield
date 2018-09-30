import Decoder from "./Decoder";
import EncodedMessage from "./EncodedMessage";
import TextDisplay from "./TextDisplay";
import TextStyle from "./TextStyle";

export class TextShield {
  public body: HTMLElement;
  public options: any;

  private decoder: Decoder;

  constructor(body: HTMLElement, options: any) {
    this.body = body;
    this.decoder = new Decoder();

    this.initialize();
  }

  private initialize(): void {
    let shieldedElements = this.getShieldedElements();
    for (let element of shieldedElements) {
      let encodedMessage = EncodedMessage.parse(element.textContent);
      let mode = (element.getAttribute("mode") || "normal").toLowerCase().trim();

      if (encodedMessage) {
        let message = this.decoder.decode(encodedMessage);

        if (mode == "plain") {
          element.textContent = message;
        } else {
          let style = new TextStyle(window.getComputedStyle(element));
          let textDisplay = new TextDisplay(message, style);
          element.parentNode.replaceChild(textDisplay.getCanvas(), element);
          if (mode == "distort") {
            textDisplay.applyDistortion();
          }
        }
      }
    }
  }

  private getShieldedElements(): HTMLElement[] {
    let elements = this.body.getElementsByTagName("shield");
    return Array.prototype.slice.call(elements);
  }
}

export default TextShield;
