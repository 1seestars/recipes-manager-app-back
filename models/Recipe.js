const { Schema, model } = require("mongoose")
const { versionSchema } = require('./Version')

const recipeSchema = new Schema(
    {   
        name: String,
        createdAt: Date,
        versions: [versionSchema]
    }
)

const RecipeModel = model("Recipe", recipeSchema)

module.exports = { RecipeModel }