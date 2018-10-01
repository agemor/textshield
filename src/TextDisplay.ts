import TextStyle from "./TextStyle";
import Filter from "./filters/Filter";
import SinusoidalDistortionFilter from "./filters/SinusoidalDistortionFilter";

export class TextDisplay {
  private devicePixelRatio: number;

  public text: string;
  public style: TextStyle;

  private canvas: HTMLCanvasElement;
  private canvasContext: CanvasRenderingContext2D;

  private filter: Filter;

  constructor(text: string, style: TextStyle) {
    this.devicePixelRatio = window.devicePixelRatio || 2;

    this.text = text;
    this.style = style;

    this.createCanvas();
    this.initializeCanvas();
  }

  public applyDistortion(): void {
    this.filter = new SinusoidalDistortionFilter(this.canvas, 0.5);
  }

  private createCanvas(): void {
    this.canvas = document.createElement("canvas");
    this.canvasContext = this.canvas.getContext("2d");
  }

  private initializeCanvas(): void {
    let context = this.canvasContext;

    context.font = this.style.getCanvasFont();

    let textWidth = context.measureText(this.text).width;
    let textHeight = this.style.fontSize * 1.1;

    context.canvas.width = textWidth * this.devicePixelRatio;
    context.canvas.height = textHeight * this.devicePixelRatio;
    context.fillStyle = this.style.fontColor;

    context.font = this.style.getCanvasFont(this.devicePixelRatio);
    context.textBaseline = "bottom";

    context.fillText(this.text, 0, textHeight * this.devicePixelRatio);
    context.canvas.style.width = textWidth + "px";
    context.canvas.style.height = textHeight + "px";
    context.canvas.style.verticalAlign = "text-bottom";
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }
}

export default TextDisplay;
