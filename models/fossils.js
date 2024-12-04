const mongoose = require('mongoose');

const FossilSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Fossil name is required'], // Name field must be provided
        minlength: [3, 'Fossil name must have at least 3 characters'], // Ensures the name is not too short
        maxlength: [100, 'Fossil name cannot exceed 100 characters'], // Ensures the name is not too long
    },
    age: {
        type: Number,
        required: [true, 'Age is required'], // Age field must be provided
        min: [0, 'Age must be a non-negative number'], // Restricts age to positive values
        max: [1000, 'Age exceeds the valid range, please verify'], // Prevents unrealistically large age values
    },
    location: {
        type: String,
        required: [true, 'Location is required'], // Location field must be provided
    },
});

module.exports = mongoose.model('Fossil', FossilSchema);
