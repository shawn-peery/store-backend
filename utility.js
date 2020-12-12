const bcrypt = require("bcrypt");

function encryptPassword(password) {
  const SALT_WORK_FACTOR = 10;
  const encryptionPromise = new Promise((resolve, reject) => {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err);

        password = hash;
        resolve(password);
      });
    });
  });
  return encryptionPromise;
}
module.exports = { encryptPassword };
