import TextStyle from "./TextStyle";
import Filter from "./filters/Filter";
import SinusoidalDistortionFilter from "./filters/SinusoidalDistortionFilter";

/**
 * TextShield Text Display
 *
 * Renders decoded text into bot-safe formats.
 * It automatically detects and formulates text style based on the context
 * the original text is located.
 *
 * Canvas filter is supported for protect OCR based bots.
 *
 * @version 1.0.0
 * @author HyunJun Kim
 * @license MIT
 */
export class TextDisplay {
  // DPI is used for evaluating canvas resolution
  private devicePixelRatio: number;

  public text: string;
  public style: TextStyle;

  private canvas: HTMLCanvasElement;
  private canvasContext: CanvasRenderingContext2D;
  private filter: Filter;

  constructor(text: string, style: TextStyle) {
    // Basic DPI is set to 2
    this.devicePixelRatio = window.devicePixelRatio || 2;

    this.text = text;
    this.style = style;

    this.createCanvas();
    this.initializeCanvas();
  }

  public applyDistortion(): void {
    this.filter = new SinusoidalDistortionFilter(this.canvas, 0.5);
  }

  /**
   * Create canvas DOM element
   */
  private createCanvas(): void {
    this.canvas = document.createElement("canvas");
    this.canvasContext = this.canvas.getContext("2d");
  }

  /**
   * Draw text on canvas
   */
  private initializeCanvas(): void {
    let context = this.canvasContext;

    context.font = this.style.getCanvasFont();

    let textWidth = context.measureText(this.text).width;

    // For multilanguage support, gap in the top is reserved for better display
    let textHeight = this.style.fontSize * 1.1;

    context.canvas.width = textWidth * this.devicePixelRatio;
    context.canvas.height = textHeight * this.devicePixelRatio;
    context.fillStyle = this.style.fontColor;

    context.font = this.style.getCanvasFont(this.devicePixelRatio);
    context.textBaseline = "bottom";

    context.fillText(this.text, 0, textHeight * this.devicePixelRatio);

    // Align text to the exact right position
    context.canvas.style.width = textWidth + "px";
    context.canvas.style.height = textHeight + "px";
    context.canvas.style.verticalAlign = "text-bottom";
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }
}

export default TextDisplay;
