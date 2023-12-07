const Encription = require('../utils/encryption_data');




ComparePass = {}


ComparePass.PasswordMatch = ( password, hash ) => {

    password = Encription.encryptString( password );

    if ( password === hash ) {
        return true
    }

    return false

}

module.exports = ComparePass;