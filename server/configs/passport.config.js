const User = require('../models/User.model');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passport = require('passport');

passport.serializeUser((loggedInUser, cb) => cb(null, loggedInUser._id))

passport.deserializeUser((userIdFromSession, cb) => {
    User.findById(userIdFromSession, (err, userDocument) => {
        if (err) {
            cb(err);
            return;
        }
        cb(null, userDocument);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    (email, password, done) => {
        User.findOne({ email })
            .then(foundUser => {
                if (!foundUser) {
                    done(null, false, { message: 'Correo electrónico incorrecto' });
                    return;
                }
                if (!bcrypt.compareSync(password, foundUser.password)) {
                    done(null, false, { message: 'Contraseña incorrecta' });
                    return;
                }
                done(null, foundUser);
            })
            .catch(err => done(err));
    }
));