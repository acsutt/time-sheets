const express = require('express');
const activityRoute = express.Router();
const jwt = require('jsonwebtoken');
const { SECRET } = require('../constants');

// model
let ActivityModel = require('../models/Activity');

const verifyUserToken = (req, res, next) => {
  try {
    req.user = jwt.verify(req.headers.authorization, SECRET);
    return next();
  } catch (error) {
    console.log(error)
    return res.status(401);
  }
}

activityRoute.route('/create-activity').post(verifyUserToken, (req, res, next) => {
    req.body.userId = req.user._id
    ActivityModel.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
      })
});

activityRoute.route('/').get(verifyUserToken, async (req, res) => {
    const activityModel = await ActivityModel.find({ userId: req.user._id })
    res.json(activityModel);
});

activityRoute.route('/:id').get(verifyUserToken, async (req, res, next) => {
    const { _id } = req.user;
    const { id } = req.params;
    const activityModel = await ActivityModel.findOne({ _id: id, user: _id })
    res.json(activityModel);
 })

activityRoute.route('/edit-activity/:id').get((req, res, next) => {
    ActivityModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update
activityRoute.route('/update-activity/:id').put((req, res, next) => {
  ActivityModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Activity successfully updated!')
    }
  })
})

// Delete
activityRoute.route('/delete-activity/:id').delete((req, res, next) => {
  ActivityModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = activityRoute;