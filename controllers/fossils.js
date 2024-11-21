const mongoose = require("mongoose");
const Fossil = require("../models/fossils"); // Import the Fossil model

// Helper function for validation
const validateFossil = (data) => {
    const errors = [];
    if (!data.name) errors.push("Name is required");
    if (!data.age) errors.push("Age is required");
    if (!data.location) errors.push("Location is required");
    return errors;
};

// List all fossils (Read all)
exports.fossil_list = async function (req, res) {
    try {
        const fossils = await Fossil.find();
        res.render("fossils", { title: "Fossils List", fossils: fossils });
    } catch (err) {
        res.status(500).send(`Error retrieving fossils: ${err}`);
    }
};

// Get details of a specific fossil (Read one)
exports.fossil_detail = async function (req, res) {
    console.log("Fetching Fossil ID:", req.params.id);

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid Fossil ID format");
    }

    try {
        const fossil = await Fossil.findById(req.params.id);
        if (!fossil) {
            return res.status(404).send("Fossil not found");
        }
        res.send(fossil);
    } catch (err) {
        res.status(500).send(`Error retrieving fossil: ${err}`);
    }
};

// Create a new fossil (Create)
exports.fossil_create_post = async function (req, res) {
    const errors = validateFossil(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    const fossil = new Fossil({
        name: req.body.name,
        age: req.body.age,
        location: req.body.location,
    });

    try {
        const result = await fossil.save();
        res.status(201).json({ message: "Fossil created successfully", fossil: result });
    } catch (err) {
        res.status(500).send(`Error creating fossil: ${err}`);
    }
};

// Update an existing fossil (Update)
exports.fossil_update_put = async function (req, res) {
    console.log("Updating Fossil ID:", req.params.id);

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid Fossil ID format");
    }

    try {
        let fossil = await Fossil.findById(req.params.id);
        if (!fossil) {
            return res.status(404).send("Fossil not found");
        }

        // Update fields
        if (req.body.name) fossil.name = req.body.name;
        if (req.body.age) fossil.age = req.body.age;
        if (req.body.location) fossil.location = req.body.location;

        const updatedFossil = await fossil.save();
        res.json({ message: "Fossil updated successfully", fossil: updatedFossil });
    } catch (err) {
        res.status(500).send(`Error updating fossil: ${err}`);
    }
};

// Delete a fossil (Delete)
exports.fossil_delete = async function (req, res) {
    console.log("Deleting Fossil ID:", req.params.id);

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid Fossil ID format");
    }

    try {
        const fossil = await Fossil.findByIdAndDelete(req.params.id);
        if (!fossil) {
            return res.status(404).send("Fossil not found");
        }
        res.json({ message: "Fossil deleted successfully", fossil });
    } catch (err) {
        res.status(500).send(`Error deleting fossil: ${err}`);
    }
};

// Render view for a single fossil
exports.fossil_view_one_Page = async function (req, res) {
    console.log("View for Fossil ID:", req.query.id);

    if (!req.query.id || !mongoose.Types.ObjectId.isValid(req.query.id)) {
        return res.status(400).send("Invalid Fossil ID");
    }

    try {
        const fossil = await Fossil.findById(req.query.id);
        if (!fossil) {
            return res.status(404).send("Fossil not found");
        }
        res.render("fossilsdetail", { title: "Fossil Detail", toShow: fossil });
    } catch (err) {
        res.status(500).send(`Error rendering detail page: ${err}`);
    }
};

// Render page to create a new fossil
exports.fossil_create_Page = function (req, res) {
    console.log("Render Create Fossil Page");

    try {
        res.render("fossilscreate", { title: "Create Fossil" });
    } catch (err) {
        res.status(500).send(`Error rendering create page: ${err}`);
    }
};

// Render page to update a fossil
exports.fossil_update_Page = async function (req, res) {
    console.log("Render Update Fossil Page for ID:", req.query.id);

    if (!req.query.id || !mongoose.Types.ObjectId.isValid(req.query.id)) {
        return res.status(400).send("Invalid Fossil ID");
    }

    try {
        const fossil = await Fossil.findById(req.query.id);
        if (!fossil) {
            return res.status(404).send("Fossil not found");
        }
        res.render("fossilupdate", { title: "Update Fossil", toShow: fossil });
    } catch (err) {
        res.status(500).send(`Error rendering update page: ${err}`);
    }
};

// Render page to delete a fossil
exports.fossil_delete_Page = async function (req, res) {
    console.log("Render Delete Fossil Page for ID:", req.query.id);

    if (!req.query.id || !mongoose.Types.ObjectId.isValid(req.query.id)) {
        return res.status(400).send("Invalid Fossil ID");
    }

    try {
        const fossil = await Fossil.findById(req.query.id);
        if (!fossil) {
            return res.status(404).send("Fossil not found");
        }
        res.render("fossildelete", { title: "Delete Fossil", toShow: fossil });
    } catch (err) {
        res.status(500).send(`Error rendering delete page: ${err}`);
    }
};
