const express = require('express');
const activityRoute = express.Router();
const jwt = require('jsonwebtoken');
const { SECRET } = require('../constants');

// model
let ActivityModel = require('../models/Activity');

//Verifys the token from local storage 
const verifyUserToken = (req, res, next) => {
  try {
    req.user = jwt.verify(req.headers.authorization, SECRET);
    return next();
  } catch (error) {
    console.log(error)
    return res.status(401);
  }
}
// Creates a new activity in the database and assigns the current users ID to it 
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
// Gets all of the activities from the db of the currently signed in user
activityRoute.route('/get-all').get(verifyUserToken, async (req, res) => {
    const activityModel = await ActivityModel.find({ userId: req.user._id })
    res.json(activityModel);
});
// Gets a specific activity model of the currently signed in user
activityRoute.route('/:id').get(verifyUserToken, async (req, res, next) => {
    const { _id } = req.user;
    const { id } = req.params;
    const activityModel = await ActivityModel.findOne({ _id: id, user: _id })
    res.json(activityModel);
 })
// Gets a specific activity model by its ID
activityRoute.route('/edit-activity/:id').get((req, res, next) => {
    ActivityModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Updates an activity in the database based on provided ID
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

// Delete an acitivty in the database based on provided ID
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
// Delete an acitivty in the database based on provided ID
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
// Delete all activities with certain user ID
activityRoute.route('/delete-all').delete(verifyUserToken, async (req, res, next) => {
  while (await ActivityModel.findOne({ userId: req.user._id })) {
    await ActivityModel.findOneAndDelete({ userId: req.user._id }, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  }
})

module.exports = activityRoute;