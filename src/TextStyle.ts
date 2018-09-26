export class TextStyle {
  public fontSize: number;
  public lineHeight: number;

  constructor(cssStyle?: CSSStyleDeclaration) {
    if (cssStyle != null) {
      this.loadCssStyle(cssStyle);
    }
  }

  private loadCssStyle(cssStyle: CSSStyleDeclaration) {
    let get = (id: string): string => cssStyle.getPropertyValue(id);
    let pixelToNumber = (pix: string): number => Number(pix.split("px")[0]);
    console.log(cssStyle);

    this.fontSize = pixelToNumber(get("font-size"));
    this.lineHeight = pixelToNumber(get("line-height"));
  }
}

export default TextStyle;
