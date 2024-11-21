var express = require('express');
var router = express.Router();

/* Sample fossil data */
const fossils = [
  { name: 'Tyrannosaurus', age: 65, location: 'Montana' },
  { name: 'Triceratops', age: 68, location: 'South Dakota' },
  { name: 'Stegosaurus', age: 155, location: 'Colorado' },
];

/* GET fossils page. */
router.get('/', function(req, res, next) {
  res.render('fossils', { title: 'Search Results - Fossils', fossils });
});

module.exports = router;
