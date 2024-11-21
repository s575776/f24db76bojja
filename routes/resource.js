var express = require('express');
var router = express.Router();

var api_controller = require('../controllers/api');
var fossil_controller = require('../controllers/fossils');  // Corrected to use fossil controller

// Root route for API documentation or overview
router.get('/', api_controller.api);

// Create a new fossil
router.post('/fossils', fossil_controller.fossil_create_post);  // Corrected route for fossils

// Delete a fossil by ID
router.delete('/fossils/:id', fossil_controller.fossil_delete);  // Corrected route for fossils

// Update a fossil by ID
router.put('/fossils/:id', fossil_controller.fossil_update_put);  // Corrected route for fossils

// Get details of a specific fossil by ID
router.get('/fossils/:id', fossil_controller.fossil_detail);  // Corrected route for fossils

// Get a list of all fossils
router.get('/fossils', fossil_controller.fossil_list);  // Corrected route for fossils

module.exports = router;
