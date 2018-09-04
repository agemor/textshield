import Hash from "./crypto/Hash";
import Cipher from "./crypto/Cipher";

console.log(Hash.digest("김현준"));
let key = "김현준";
let original = "김현준";
let enc = Cipher.encrypt(original, key);
console.log(enc);

let dec = Cipher.decrypt(enc, key);
console.log(dec);
