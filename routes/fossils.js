var express = require('express');
var router = express.Router();
var fossil_controller = require('../controllers/fossils');

// GET all fossils
router.get('/', fossil_controller.fossil_list);

// POST a new fossil
router.post('/', fossil_controller.fossil_create_post);

// PUT to update a fossil by ID
router.put('/:id', fossil_controller.fossil_update_put);

// DELETE a fossil by ID
router.delete('/:id', fossil_controller.fossil_delete);

// GET details of a single fossil by ID
router.get('/:id', fossil_controller.fossil_detail);

// GET fossil detail view page
router.get('/detail', fossil_controller.fossil_view_one_Page);

// GET fossil create page
router.get('/create', fossil_controller.fossil_create_Page);

// GET fossil update page
router.get('/update', fossil_controller.fossil_update_Page);

// GET fossil delete page
router.get('/delete', fossil_controller.fossil_delete_Page);

module.exports = router;
