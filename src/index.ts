import Hash from "./crypto/Hash";
import Cipher from "./crypto/Cipher";

console.log(Hash.digest("김현준").toString());
let original = "김현준";
let enc = Cipher.encrypt(original, "qe");
console.log(enc.toString());
