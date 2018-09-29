import Filter from "./Filter";

export class SinusoidalDistortionFilter extends Filter {

  public amplitude: number;
  public frequency: number;
  public frameRate: number;

  private frames: number = 0;

  constructor(canvas: HTMLCanvasElement, frequency: number, frameRate: number = 60) {
    super(canvas);
    console.log(this.canvas.height)
    this.amplitude = Math.max((this.canvas.height / 30), 0);
    this.frequency = frequency;
    this.frameRate = frameRate;

    this.apply();
  }

  private apply(): void {

    if (this.frames % 3 == 0) {


      let target = this.target.data;
      let source = this.source.data;

      let xs, ys, dest, src;

      let A = this.amplitude;
      let Af = Math.floor(A);

      let w = this.canvas.width;
      let h = this.canvas.height;

      let T = this.frames * this.frequency / this.frameRate;
      let tau = Math.PI * 2;

      for (let x = Af; x < w - Af; ++x) {
        ys = Math.round(A * Math.cos(tau * (3 * x / w + T)));
        for (let y = Af; y < h - Af; ++y) {
          xs = Math.round(A * Math.sin(tau * (3 * y / h + T)));
          dest = y * w * 4 + x * 4;
          src = (y + ys) * w * 4 + (x + xs) * 4;
          target[dest] = source[src];
          target[dest + 1] = source[src + 1];
          target[dest + 2] = source[src + 2];
          target[dest + 3] = source[src + 3];
        }
      }

      this.context.putImageData(this.target, 0, 0);

    }
    this.frames++;

    window.requestAnimationFrame(() => this.apply());

  }

}

export default SinusoidalDistortionFilter;