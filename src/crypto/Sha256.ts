import Base64 from "../encoding/Base64";

/**
 * Practical implementation of SHA-256 algorithm
 * based on FIPS PUB 180-2 specification
 * 
 * @version 1.0.0
 * @author HyunJun Kim
 * @license MIT
 */
export class Sha256 {

  /**
   * Digests a string into SHA-256 hash
   * @param message
   */
  public static hash(message: string): string {
    message = message + String.fromCharCode(0x80);

    const N = Math.ceil((message.length / 4 + 2) / 16);
    const M = new Uint32Array(N * 16);

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < 16; j++) {
        M[i * 16 + j] =
          (message.charCodeAt(i * 64 + j * 4 + 0) << 24) |
          (message.charCodeAt(i * 64 + j * 4 + 1) << 16) |
          (message.charCodeAt(i * 64 + j * 4 + 2) << 8) |
          (message.charCodeAt(i * 64 + j * 4 + 3) << 0);
      }
    }

    const bitLenHi = Math.floor(((message.length - 1) * 8) / Math.pow(2, 32));
    const bitLenLo = ((message.length - 1) * 8) | 0;
    M[(N - 1) * 16 + 14] = bitLenHi;
    M[(N - 1) * 16 + 15] = bitLenLo;

    // Initial hash values
    let H = new Uint32Array([
      0x6a09e667,
      0xbb67ae85,
      0x3c6ef372,
      0xa54ff53a,
      0x510e527f,
      0x9b05688c,
      0x1f83d9ab,
      0x5be0cd19
    ]);

    let a, b, c, d, e, f, g, h: number;
    let t1, t2, s0, s1, ch, maj: number;

    // Start hash routine
    for (let i = 0; i < N; i++) {
      const W = new Uint32Array(64);

      for (let t = 0; t < 16; t++) W[t] = M[i * 16 + t];
      for (let t = 16; t < 64; t++) {
        t1 = W[t - 2];
        t1 =
          ((t1 >>> 17) | (t1 << 15)) ^ ((t1 >>> 19) | (t1 << 13)) ^ (t1 >>> 10);
        t2 = W[t - 15];
        t2 =
          ((t2 >>> 7) | (t2 << 25)) ^ ((t2 >>> 18) | (t2 << 14)) ^ (t2 >>> 3);
        W[t] = (t1 + W[t - 7] + t2 + W[t - 16]) | 0;
      }

      a = H[0];
      b = H[1];
      c = H[2];
      d = H[3];
      e = H[4];
      f = H[5];
      g = H[6];
      h = H[7];

      for (let t = 0; t < 64; t++) {
        s1 =
          ((e >>> 6) | (e << 26)) ^
          ((e >>> 11) | (e << 21)) ^
          ((e >>> 25) | (e << 7));
        ch = g ^ (e & (f ^ g));
        s0 =
          ((a >>> 2) | (a << 30)) ^
          ((a >>> 13) | (a << 19)) ^
          ((a >>> 22) | (a << 10));
        maj = (a & b) | (c & (a ^ b));

        t1 = h + s1 + ch + Sha256.K[t] + W[t];
        t2 = s0 + maj;

        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
      }
      H[0] = (H[0] + a) | 0;
      H[1] = (H[1] + b) | 0;
      H[2] = (H[2] + c) | 0;
      H[3] = (H[3] + d) | 0;
      H[4] = (H[4] + e) | 0;
      H[5] = (H[5] + f) | 0;
      H[6] = (H[6] + g) | 0;
      H[7] = (H[7] + h) | 0;
    }

    // 32-bit array to 4*8-bit array
    let buffer = new Uint8Array(H.length * 4);
    let bufferString = "";

    for (let i = 0; i < H.length; i++) {
      buffer[i * 4] = (H[i] & 0xff000000) >> 24;
      buffer[i * 4 + 1] = (H[i] & 0xff0000) >> 16;
      buffer[i * 4 + 2] = (H[i] & 0xff00) >> 8;
      buffer[i * 4 + 3] = (H[i] & 0xff);
    }

    for (let i = 0; i < buffer.byteLength; i++) {
      bufferString += String.fromCharCode(buffer[i]);
    }

    /// Encode as base64 string
    return Base64.encode(bufferString);
  }

  // Round constants
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

export default Sha256;