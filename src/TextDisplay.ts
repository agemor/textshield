export class TextDisplay {
  public text: string;
  public style: CSSStyleDeclaration;

  private canvas: HTMLCanvasElement;
  private canvasContext: CanvasRenderingContext2D;

  constructor(text: string, style: CSSStyleDeclaration) {
    this.text = text;
    this.style = style;

    this.createCanvas();
    this.updateCanvas();
  }

  private createCanvas(): void {
    this.canvas = document.createElement("canvas");
    this.canvasContext = this.canvas.getContext("2d");
  }

  private updateCanvas(): void {
    console.log(this.style);

    let context = this.canvasContext;

    //context.font = "30px Arial";

    context.fillText(this.text, 10, 50);
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }
}

export default TextDisplay;
