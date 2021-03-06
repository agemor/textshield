/**
 * TextShield Text Style
 *
 * Parse required text style to reconstruct canvas text that matches original appereances.
 * Usually, given css style is calculated by getComputedStyle() function.
 *
 * @version 1.0.0
 * @author HyunJun Kim
 * @license MIT
 */
export class TextStyle {
  public fontSize: number;
  public fontColor: string;
  public fontFamily: string;
  public fontWeight: string;
  public fontVariant: string;
  public fontStyle: string;

  constructor(cssStyle?: CSSStyleDeclaration) {
    if (cssStyle != null) {
      this.loadCssStyle(cssStyle);
    }
  }

  /**
   * Retrieve basic font styling properties
   *
   * @param cssStyle
   */
  private loadCssStyle(cssStyle: CSSStyleDeclaration) {
    let get = (id: string): string => cssStyle.getPropertyValue(id);
    let pixelToNumber = (pix: string): number => Number(pix.split("px")[0]);

    this.fontStyle = get("font-style");
    this.fontVariant = get("font-variant");
    this.fontWeight = get("font-weight");
    this.fontSize = pixelToNumber(get("font-size"));
    this.fontFamily = get("font-family");
    this.fontColor = get("color");
  }

  /**
   * Write text style in canvas format
   *
   * @param scale
   */
  public getCanvasFont(scale: number = 1): string {
    let ws = " ";
    let canvasFont =
      this.fontStyle +
      ws +
      this.fontVariant +
      ws +
      this.fontWeight +
      ws +
      this.fontSize * scale +
      "px" +
      ws +
      this.fontFamily;
    return canvasFont;
  }
}

export default TextStyle;
