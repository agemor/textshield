import TextShield from "./TextShield";
import Encoder from "./Encoder";

// Add window module for encoding requirements
(<any>window).TextShieldEncoder = new Encoder();

window.onload = function(): void {
  let textshield = new TextShield(document.body, null);
};
