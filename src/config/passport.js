const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const FindUser = require('../utils/findById');
require('dotenv').config({path: 'values.env'});

module.exports = (passport) => {
    
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = process.env.KEY;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        FindUser.find(jwt_payload.id, (err, user) => {
            if(err){
                return done(err, false);
            }
            if(user){
                return done(null, user);
            }
            else{
                return done(null, false);
            }
        });
    }));
}