const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { RecipeModel } = require("./models/Recipe");

mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/recipes", async (request, response) => {
  try {
    const recipes = await RecipeModel.find({});
    return response.json(recipes);
  } catch (e) {
    return response.status(400).json({ message: e.message });
  }
});

app.get("/recipe/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const recipe = await RecipeModel.findOne({ _id: id });
    return response.json(recipe);
  } catch (e) {
    return response.status(400).json({ message: e.message });
  }
});

app.post("/recipe", async (request, response) => {
  try {
    const { name, description } = request.body;
    const newItem = await RecipeModel.create({
      name,
      createdAt: Date.now() + 7200000,
      versions: [{ description }]
    });
    return response.json(newItem);
  } catch (e) {
    return response.status(400).json({ message: e.message });
  }
});

app.put("/recipe/:id", async (request, response) => {
  try {
    const {
      body: { name, description },
      params: { id }
    } = request;
    await RecipeModel.findOneAndUpdate({ _id: id }, { name });
    const recipe = await RecipeModel.findOne({ _id: id });
    if (
      recipe.versions[recipe.versions.length - 1].description !== description
    ) {
      await recipe.versions.push({ description });
      await recipe.save();
    }
    return response.json(recipe);
  } catch (e) {
    return response.status(400).json({ message: e.message });
  }
});

app.delete("/recipe/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const recipe = await RecipeModel.deleteOne({ _id: id });
    recipe.message = "Recipe has been removed";
    return response.json(recipe);
  } catch (e) {
    return response.status(400).json({ message: e.message });
  }
});

app.delete("/recipes", async (request, response) => {
  try {
    const recipes = await RecipeModel.deleteMany({});
    recipes.message = "All recipes have been removed";
    return response.json(recipes);
  } catch (e) {
    return response.status(400).json({ message: e.message });
  }
});

app.listen(4000, () => {
  console.log("Server is runnig");
});
