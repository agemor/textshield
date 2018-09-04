export interface Hash {
  digest(message: string): string;
}

/**
 * Fast SHA256 Hash algorithm from Dmitry Chestnykh's implementation
 * https://github.com/dchest/fast-sha256-js
 */
export class SHA256 implements Hash {
  private readonly digestLength: number = 32;
  private finished: boolean = false;
  private state: Int32Array = new Int32Array(8);
  private temp: Int32Array = new Int32Array(64);
  private buffer: Uint8Array = new Uint8Array(128);
  private bufferLength: number = 0;
  private bytesHashed: number = 0;

  constructor() {
    this.initialize();
  }

  /**
   * Cleans internal buffers and re-initializes hash state.
   **/
  private initialize(): void {
    this.bufferLength = 0;
    this.bytesHashed = 0;
    this.finished = false;

    for (let i = 0; i < this.buffer.length; i++) {
      this.buffer[i] = 0;
    }
    for (let i = 0; i < this.temp.length; i++) {
      this.temp[i] = 0;
    }
    this.state[0] = 0x6a09e667;
    this.state[1] = 0xbb67ae85;
    this.state[2] = 0x3c6ef372;
    this.state[3] = 0xa54ff53a;
    this.state[4] = 0x510e527f;
    this.state[5] = 0x9b05688c;
    this.state[6] = 0x1f83d9ab;
    this.state[7] = 0x5be0cd19;
  }

  /**
   * Updates hash state with the given data.
   *
   * @param data
   * @param dataLength
   */
  update(data: Uint8Array, dataLength: number = data.length): void {
    if (!this.finished) {
      let dataPos = 0;
      this.bytesHashed += dataLength;
      if (this.bufferLength > 0) {
        while (this.bufferLength < 64 && dataLength > 0) {
          this.buffer[this.bufferLength++] = data[dataPos++];
          dataLength--;
        }
        if (this.bufferLength === 64) {
          this.hashBlocks(this.temp, this.state, this.buffer, 0, 64);
          this.bufferLength = 0;
        }
      }
      if (dataLength >= 64) {
        dataPos = this.hashBlocks(
          this.temp,
          this.state,
          data,
          dataPos,
          dataLength
        );
        dataLength %= 64;
      }
      while (dataLength > 0) {
        this.buffer[this.bufferLength++] = data[dataPos++];
        dataLength--;
      }
    }
  }

  /**
   * Finalizes hash state and puts hash into out.
   *
   * @param output
   */
  finish(): Uint8Array {
    let output = new Uint8Array(this.digestLength);

    if (!this.finished) {
      const bytesHashed = this.bytesHashed;
      const left = this.bufferLength;
      const bitLenHi = (bytesHashed / 0x20000000) | 0;
      const bitLenLo = bytesHashed << 3;
      const padLength = bytesHashed % 64 < 56 ? 64 : 128;

      this.buffer[left] = 0x80;
      for (let i = left + 1; i < padLength - 8; i++) {
        this.buffer[i] = 0;
      }
      this.buffer[padLength - 8] = (bitLenHi >>> 24) & 0xff;
      this.buffer[padLength - 7] = (bitLenHi >>> 16) & 0xff;
      this.buffer[padLength - 6] = (bitLenHi >>> 8) & 0xff;
      this.buffer[padLength - 5] = (bitLenHi >>> 0) & 0xff;
      this.buffer[padLength - 4] = (bitLenLo >>> 24) & 0xff;
      this.buffer[padLength - 3] = (bitLenLo >>> 16) & 0xff;
      this.buffer[padLength - 2] = (bitLenLo >>> 8) & 0xff;
      this.buffer[padLength - 1] = (bitLenLo >>> 0) & 0xff;

      this.hashBlocks(this.temp, this.state, this.buffer, 0, padLength);
      this.finished = true;
    }

    for (let i = 0; i < 8; i++) {
      output[i * 4 + 0] = (this.state[i] >>> 24) & 0xff;
      output[i * 4 + 1] = (this.state[i] >>> 16) & 0xff;
      output[i * 4 + 2] = (this.state[i] >>> 8) & 0xff;
      output[i * 4 + 3] = (this.state[i] >>> 0) & 0xff;
    }
    return output;
  }

  /**
   * Digest string to hashed hex string
   * @param message
   */
  digest(message: string): string {
    this.initialize();
    this.update(this.stringToBuffer(message));
    return this.bufferToHex(this.finish());
  }

  private hashBlocks(
    w: Int32Array,
    v: Int32Array,
    p: Uint8Array,
    pos: number,
    len: number
  ): number {
    let a, b, c, d, e, f, g, h, u, i, j: number;
    let t1, t2: number;
    while (len >= 64) {
      a = v[0];
      b = v[1];
      c = v[2];
      d = v[3];
      e = v[4];
      f = v[5];
      g = v[6];
      h = v[7];

      for (i = 0; i < 16; i++) {
        j = pos + i * 4;
        w[i] =
          ((p[j] & 0xff) << 24) |
          ((p[j + 1] & 0xff) << 16) |
          ((p[j + 2] & 0xff) << 8) |
          (p[j + 3] & 0xff);
      }

      for (i = 16; i < 64; i++) {
        u = w[i - 2];
        t1 =
          ((u >>> 17) | (u << (32 - 17))) ^
          ((u >>> 19) | (u << (32 - 19))) ^
          (u >>> 10);
        u = w[i - 15];
        t2 =
          ((u >>> 7) | (u << (32 - 7))) ^
          ((u >>> 18) | (u << (32 - 18))) ^
          (u >>> 3);
        w[i] = ((t1 + w[i - 7]) | 0) + ((t2 + w[i - 16]) | 0);
      }

      for (i = 0; i < 64; i++) {
        t1 =
          ((((((e >>> 6) | (e << (32 - 6))) ^
            ((e >>> 11) | (e << (32 - 11))) ^
            ((e >>> 25) | (e << (32 - 25)))) +
            ((e & f) ^ (~e & g))) |
            0) +
            ((h + ((SHA256.K[i] + w[i]) | 0)) | 0)) |
          0;
        t2 =
          ((((a >>> 2) | (a << (32 - 2))) ^
            ((a >>> 13) | (a << (32 - 13))) ^
            ((a >>> 22) | (a << (32 - 22)))) +
            ((a & b) ^ (a & c) ^ (b & c))) |
          0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
      }
      v[0] += a;
      v[1] += b;
      v[2] += c;
      v[3] += d;
      v[4] += e;
      v[5] += f;
      v[6] += g;
      v[7] += h;
      pos += 64;
      len -= 64;
    }
    return pos;
  }

  private stringToBuffer(string: string): Uint8Array {
    var buffer = new ArrayBuffer(string.length);
    var bufferView = new Uint8Array(buffer);
    for (var i = 0, strLen = string.length; i < strLen; i++) {
      bufferView[i] = string.charCodeAt(i);
    }
    return bufferView;
  }

  private bufferToHex(buffer: Uint8Array): string {
    return Array.prototype.map
      .call(buffer, function(byte: number) {
        return ("0" + (byte & 0xff).toString(16)).slice(-2);
      })
      .join("");
  }

  private static readonly K = new Uint32Array([
    0x428a2f98,
    0x71374491,
    0xb5c0fbcf,
    0xe9b5dba5,
    0x3956c25b,
    0x59f111f1,
    0x923f82a4,
    0xab1c5ed5,
    0xd807aa98,
    0x12835b01,
    0x243185be,
    0x550c7dc3,
    0x72be5d74,
    0x80deb1fe,
    0x9bdc06a7,
    0xc19bf174,
    0xe49b69c1,
    0xefbe4786,
    0x0fc19dc6,
    0x240ca1cc,
    0x2de92c6f,
    0x4a7484aa,
    0x5cb0a9dc,
    0x76f988da,
    0x983e5152,
    0xa831c66d,
    0xb00327c8,
    0xbf597fc7,
    0xc6e00bf3,
    0xd5a79147,
    0x06ca6351,
    0x14292967,
    0x27b70a85,
    0x2e1b2138,
    0x4d2c6dfc,
    0x53380d13,
    0x650a7354,
    0x766a0abb,
    0x81c2c92e,
    0x92722c85,
    0xa2bfe8a1,
    0xa81a664b,
    0xc24b8b70,
    0xc76c51a3,
    0xd192e819,
    0xd6990624,
    0xf40e3585,
    0x106aa070,
    0x19a4c116,
    0x1e376c08,
    0x2748774c,
    0x34b0bcb5,
    0x391c0cb3,
    0x4ed8aa4a,
    0x5b9cca4f,
    0x682e6ff3,
    0x748f82ee,
    0x78a5636f,
    0x84c87814,
    0x8cc70208,
    0x90befffa,
    0xa4506ceb,
    0xbef9a3f7,
    0xc67178f2
  ]);
}
