import TextShield from "./TextShield";
import Encoder from "./Encoder";

(<any>window).TextShieldEncoder = new Encoder();

window.onload = function(): void {
  let textshield = new TextShield(document.body, null);
};
