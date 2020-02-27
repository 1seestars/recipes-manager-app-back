const { Schema } = require("mongoose");
const { versionSchema } = require("./Version");

const recipeSchema = new Schema({
  name: String,
  createdAt: Date,
  versions: [versionSchema]
});

module.exports = { recipeSchema };
