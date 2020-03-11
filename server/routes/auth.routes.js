const express = require('express');
const authRoutes = express.Router();

const passport = require('passport');
const bcrypt = require('bcrypt');

const User = require('../models/User.model')


authRoutes.post('/signup', (req, res, next) => {

  console.log("------ PAYLOAD EN DESTINO -----", req.body)
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(400).json({ message: 'Introduce un correo eletrónico y una contraseña' });
    return;
  }
  // TO-DO validación en backend
  if (password.length < 6) {
    res.status(400).json({ message: 'Tu contraseña debe tener al menos 6 caracteres' });
    return;
  }

  User.findOne({ email }, (err, foundUser) => {

    if (err) {
      res.status(500).json({ message: "Error al registrar el correo electrónico" });
      return;
    }

    if (foundUser) {
      res.status(400).json({ message: 'Correo electrónico ya usado, introduce uno diferente' });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const aNewUser = new User({
      email: email,
      password: hashPass
    });

    aNewUser.save(err => {
      if (err) {
        res.status(400).json({ message: 'Error mientras se registraba el usuario, vuelve a intentarlo.' });
        return;
      }

      // Automatically log in user after sign up
      // .login() here is actually predefined passport method
      req.login(aNewUser, (err) => {

        if (err) {
          res.status(500).json({ message: 'El inicio de sesión automático ha fallado' });
          return;
        }

        // Send the user's information to the frontend
        // We can use also: res.status(200).json(req.user);
        res.status(200).json(aNewUser);
      });
    });
  });
});






authRoutes.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Algo fallo al iniciar sesión, vuelve a intentarlo' });
      return;
    }

    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Error al guardar la sesión' });
        return;
      }

      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});



authRoutes.post('/logout', (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: 'Has cerrado la sesión correctamente' });
});


authRoutes.get('/loggedin', (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: 'No estás autorizado' });
});



module.exports = authRoutes;
