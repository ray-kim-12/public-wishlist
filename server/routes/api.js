'use strict';

var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');

var User = require('../models/user-model');
var Item = require('../models/item-model');

//#1: Finding a user (to display their profile info).
router.get('/me', function(req, res) {
  // console.log(req.user, "**GET REQUEST in API.JS!!**");
  User.findById(req.user, function(err, user) {
    res.send(user);
  })
});

// router.get('/me/photos', function(req, res) {
//   console.log(req.user, "**GET REQUEST in API.JS!!**");
//   // User.findById(req.user, function(err, user) {
//   //   res.send(user);
//   // })
// });

//#2: Adding a new item to the wishlist.
router.post('/me/items', function(req, res) {
  console.log(req.user, "___#1___**<-- (MongoID) POST REQUEST in API.JS!!**");
  User.findById(req.user, function(err, user) {
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }

    Item.submit(req.body, function(err, savedItem) {
      console.log('___#6___Here is the item (api.js)', savedItem);
      user.items.push(savedItem);
      console.log("___#7___New item has been pushed into User document in Mongo.");
      user.save(function(err, user) {
        res.send(user);
      })
    });
  });
});

//Route #3: Deleting an item from the wishlist (removes it from both Mongo models).
router.put('/me/items', function(req, res) {
  console.log(req.user, "___#1___**<-- (MongoID) DELETE REQUEST in API.JS!!**");

  var clicked = req.body;
  var clickedItemId = req.body._id;
  var clickedItemName = req.body.name;

  User.findByIdAndUpdate(req.user, {$pull : { "items" : { "name" : clickedItemName }}}, function(err, user) {
    if(err){
      res.status(400).send(err);
    }

    Item.findByIdAndRemove(clickedItemId, function(err, item){
      console.log("**Item deleted from both models.");
      res.send(user);
    });
  })
});

module.exports = router
