const mongoose = require("mongoose");

const fossilSchema = mongoose.Schema({
  name: { type: String, required: true }, // Fossil name
  age: { type: String, required: true },  // Fossil age
  location: { type: String, required: true } // Fossil location
});

module.exports = mongoose.model("Fossil", fossilSchema);
