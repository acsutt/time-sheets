const express = require('express');
const userRoute = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../constants');

// model
let UserModel = require('../models/User');

// Verifys the token from local storage 
const verifyUserToken = (req, res, next) => {
  try {
    req.user = jwt.verify(req.headers.authorization, SECRET);
    return next();
  } catch (error) {
    console.log(error)
    return res.status(401);
  }
}
// Hashes the given password then creates a new user in the database
userRoute.route('/register').post( async (req, res, next) => {
  let {name, username, password, email, admin} = req.body;
  password = await bcrypt.hash(password, 10);
  UserModel.create({
    name,
    username,
    password,
    email,
    admin
  }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});
// Checks the provided username in the database for a matching username
// Then compares the hash of the given password to the one stored in record with matching
// If they both match, a token is generated using the username, id and secret constant value then returns the token
userRoute.route('/login').post( async (req, res) => {
  let {username, password} = req.body;
  if ( await UserModel.findOne({ username: username }) === null) {
    return res.json(false);
  }
  let { _id, password: userPassword } = await UserModel.findOne({ username: username });
  let match = await bcrypt.compare(password, userPassword);

  if (match) {
    const token = await jwt.sign({ username, _id }, SECRET);
    return res.json(token);
  } else {
    return res.json(false)
  }
});
// Gets the user from the database matching the id of the signed in user making the request
userRoute.route('/get-user').get(verifyUserToken, async (req, res) => {
    const userModel = await UserModel.find({ _id: req.user._id })
    res.json(userModel);
});

// Gets the data of with the ID matching the one provided
userRoute.route('/edit-user/:id').get(async (req, res, next) => {
  UserModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Updates the user record in the DB that matches the ID provided
userRoute.route('/update-user/:id').put((req, res, next) => {
  UserModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('User successfully updated!')
    }
  })
})

// Deletes the user record in the DB that matches the ID provided
userRoute.route('/delete-user/:id').delete((req, res, next) => {
  UserModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = userRoute;