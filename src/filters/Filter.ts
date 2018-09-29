/**
 * Superclass for all filter effects
 * 
 * @version 1.0.0
 * @author HyunJun Kim
 * @license MIT
 */
export class Filter {

  protected canvas: HTMLCanvasElement;
  protected context: CanvasRenderingContext2D;

  protected source: ImageData;
  protected target: ImageData;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");

    this.initialize();
  }

  /**
   * Setup basic helper members for filter operation
   */
  private initialize() {
    let width = this.canvas.width;
    let height = this.canvas.height;

    this.source = this.context.getImageData(0, 0, width, height);
    this.target = this.context.createImageData(width, height);

    this.context.imageSmoothingEnabled = false;

  }
}

export default Filter;