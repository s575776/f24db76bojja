const express = require('express');
const router = express.Router();

// Middleware to verify user authentication
const secured = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.redirect("/login");
};

// Import the necessary controller modules
const api_controller = require('../controllers/api');
const fossilController = require('../controllers/fossil');

// Root API route handler
router.get('/', api_controller.api);

// Routes for fossil-related API operations
router.post('/fossils', fossilController.fossil_create_post);
router.get('/fossils', fossilController.fossil_list);
router.get('/fossils/all', fossilController.fossil_view_all_Page);

// Route for rendering the fossil creation page
router.get('/fossils/create', secured, fossilController.fossil_create_Page);

// Route for rendering the fossil deletion page
router.get('/fossils/delete', secured, fossilController.fossil_delete_Page);

// Route for displaying details of a specific fossil using a query parameter
router.get('/fossils/detail', fossilController.fossil_view_one_Page);

// Routes for operations on a specific fossil by ID
router.get('/fossils/:id', fossilController.fossil_detail);
router.put('/fossils/:id', fossilController.fossil_update_put);
router.delete('/fossils/:id', fossilController.fossil_delete);

// Route for rendering the page to update a fossil
router.get('/update', secured, fossilController.fossil_update_Page);

module.exports = router;
