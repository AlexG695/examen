const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const password = process.env.KEY;
const key = crypto.scryptSync(password, 'salt', 32);
const iv = Buffer.alloc(16, 0);
require('dotenv').config({path: 'values.env'})
const EncryptionDataClass = {};


EncryptionDataClass.encryptString = ( cadena ) => {

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(cadena, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    cadena = encrypted;

    return cadena;
}


EncryptionDataClass.decriptString = ( cadena ) => {

    decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decrypted.update(cadena, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    cadena = decrypted;


    return cadena;
}


module.exports = EncryptionDataClass;