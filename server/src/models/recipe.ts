import mongoose, { Schema } from "mongoose";
import { IRecipe } from "../interfaces/recipe";

const recipeSchema: Schema = new Schema({
  id: { type: "string", required: true },
});

const Recipe = mongoose.model<IRecipe>("Recipes", recipeSchema);

export default Recipe;
