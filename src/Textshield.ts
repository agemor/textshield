import Decoder from "./Decoder";
import EncodedMessage from "./EncodedMessage";

export class Textshield {

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
      if (encodedMessage) {
        let message = this.decoder.decode(encodedMessage);
        element.textContent = message;
      }
    }
  }

  private getShieldedElements(): HTMLElement[] {
    let elements = this.body.getElementsByTagName("shield")
    return Array.prototype.slice.call(elements);
  }


}

export default Textshield;