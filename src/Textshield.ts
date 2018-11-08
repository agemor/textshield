import Decoder from "./Decoder";
import EncodedMessage from "./EncodedMessage";
import TextDisplay from "./TextDisplay";
import TextStyle from "./TextStyle";

/**
 * TextShield Entry Point
 *
 * Find all <shield> element from the page and try decoding and re-rendering
 * .
 * @version 1.0.0
 * @author HyunJun Kim
 * @license MIT
 */
export class TextShield {
  public body: HTMLElement;
  public options: any;

  private decoder: Decoder;

  constructor(body: HTMLElement, options: any) {
    this.body = body;
    this.decoder = new Decoder();

    this.initialize();
  }

  /**
   * Find all <shield> element with it's option.
   * After the decoding, rendering methods are choosen based on the mode attribute
   */
  private initialize(): void {
    let shieldedElements = this.getShieldedElements();
    for (let element of shieldedElements) {

      let value = (element.getAttribute("value") || "").trim();

      // Default render mode is "normal"
      let mode = (element.getAttribute("mode") || "normal")
        .toLowerCase()
        .trim();

      let encodedMessage = EncodedMessage.parse(value);

      if (encodedMessage) {
        let message = this.decoder.decode(encodedMessage);
        // Plain texts are just replaced
        if (mode == "plain") {
          element.textContent = message;
        }
        // Draw text on a canvas
        else {
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
