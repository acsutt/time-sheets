const express = require('express');
const userRoute = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../constants');

// model
let UserModel = require('../models/User');

userRoute.route('/register').post( async (req, res, next) => {
  let {name, username, password, email} = req.body;
  password = await bcrypt.hash(password, 10);
  UserModel.create({
    name,
    username,
    password,
    email
  }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

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

userRoute.route('/').get((req, res, next) => {
    UserModel.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
})

//Edit
userRoute.route('/edit-user/:id').get((req, res, next) => {
   UserModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update
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

// Delete
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