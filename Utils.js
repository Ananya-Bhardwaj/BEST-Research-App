import Elliptic from 'elliptic';
import { createHash } from 'react-native-crypto'

// Initialize elliptic curve
const EC = new Elliptic.ec("secp256k1");

// Generate a key pair
const keyPair = EC.genKeyPair();

// Example: Export private and public keys
const privateKey = keyPair.getPrivate("hex"); // Use securely
const publicKey = keyPair.getPublic("hex"); // Share this

export function hashPDF(pdfData) {
  // Hash using SHA-256
    const hash = createHash("sha256");
    hash.update(pdfData);
    const hashed = hash.digest("hex");
  return hashed; // Returns a hex string of the hash
}

export function signPDF(pdfData, privateKey) {
  const ec = new Elliptic.ec("secp256k1");
  const keyPair = ec.keyFromPrivate(privateKey);

  // Hash the PDF data
  const hashedData = hashPDF(pdfData);

  // Sign the hashed data
  const signature = keyPair.sign(hashedData);

  return {
    signature: {
      r: signature.r.toString("hex"),
      s: signature.s.toString("hex"),
    },
    hash: hashedData,
  };
}

export function verifySignature(pdfData, signature, publicKey) {
  const ec = new Elliptic.ec("secp256k1");
  const keyPair = ec.keyFromPublic(publicKey, "hex");

  // Hash the PDF data
  const hashedData = hashPDF(pdfData);

  // Verify the signature
  return keyPair.verify(hashedData, signature);
}
