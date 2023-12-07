const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'values.env'})


JWT = {};


JWT.generateToken = ( id, name ) => {

    const token = jwt.sign({ id: id, name: name }, process.env.KEY, {
        expiresIn: '6h'
    });

    return token;

}





module.exports = JWT;