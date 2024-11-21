var express = require('express');
var router = express.Router();

// Add a route for random item
router.get('/', function(req, res, next) {
  // Your logic for selecting a random item goes here
  res.render('randomitem', { title: 'A random item' });
});

module.exports = router;
