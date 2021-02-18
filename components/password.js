const crypto = require('crypto');
const salt = crypto.randomBytes(256).toString('hex');
const util = require('util');

//asynchronous Password-Based Key Derivation Function 2 (PBKDF2)

const hashPassword = async (password) => {
    //Convert the callback into a promise
    const cryptoPromise = util.promisify(crypto.pbkdf2);
    try {
        return (await cryptoPromise(password, salt, 100000, 512, 'sha512')).toString('hex');    
    } catch (error) {
        console.error(error);
    }
    
}

module.exports = hashPassword;