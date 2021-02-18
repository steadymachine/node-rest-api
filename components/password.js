const crypto = require('crypto');
const salt = crypto.randomBytes(256).toString('hex');
const util = require('util');

//asynchronous Password-Based Key Derivation Function 2 (PBKDF2) implementation

const hashPassword = (password) => {
    //Convert the callback into a promise
    const cryptoPromise = util.promisify(crypto.pbkdf2);

    cryptoPromise(password, salt, 100000, 512, 'sha512')
        .then((deliveredKey) => {
            console.log(deliveredKey.toString('hex'));
        })
        .catch((error) => {
            console.error(error);
        });
}

hashPassword('holita');