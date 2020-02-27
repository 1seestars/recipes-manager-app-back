const { model } = require("mongoose");
const { recipeSchema } = require("../schemas/Recipe");

const RecipeModel = model("Recipe", recipeSchema);

module.exports = { RecipeModel };
