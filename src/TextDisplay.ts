import { TextStyle } from "./TextStyle";

export class TextDisplay {
  private devicePixelRatio: number;

  public text: string;
  public style: TextStyle;

  private canvas: HTMLCanvasElement;
  private canvasContext: CanvasRenderingContext2D;

  constructor(text: string, style: TextStyle) {
    this.devicePixelRatio = 3; //window.devicePixelRatio || 1;

    this.text = text + "gPTja";
    this.style = style;

    this.createCanvas();
    this.updateCanvas();
  }

  private createCanvas(): void {
    this.canvas = document.createElement("canvas");
    this.canvasContext = this.canvas.getContext("2d");
  }

  private updateCanvas(): void {
    let context = this.canvasContext;

    context.font = this.style.fontSize + "px" + " Arial";

    let textWidth = context.measureText(this.text).width;
    let textHeight = this.style.fontSize;

    context.canvas.width = textWidth * this.devicePixelRatio;
    context.canvas.height = textHeight * this.devicePixelRatio;

    context.fillStyle = "yellow";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = "black";

    context.font =
      this.style.fontSize * this.devicePixelRatio + "px" + " Arial";
		
	  context.textBaseline="bottom"; 

	  
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
