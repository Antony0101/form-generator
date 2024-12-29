import * as crypto from "crypto";

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex"); // Generate a random salt
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");
  return `${salt}::${hash}`; // Return both the salt and hash as string
}

// Function to verify the password using stored salt and hash
function verifyPassword(password: string, hashWithSalt: string): boolean {
  const [storedSalt, storedHash] = hashWithSalt.split("::"); // Split the stored string into salt and hash
  const hash = crypto
    .pbkdf2Sync(password, storedSalt, 100000, 64, "sha512")
    .toString("hex");
  return hash === storedHash; // Compare the generated hash with the stored one
}

export { hashPassword, verifyPassword };
