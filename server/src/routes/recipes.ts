import express from "express";
import { getAllRecipes, addRecipe, deleteRecipe } from "../controllers/recipes";
import extractJWT from "../middleware/extractJWT";

const router = express.Router();

router.get("/", extractJWT, getAllRecipes);
router.post("/", extractJWT, addRecipe);
router.delete("/:id", extractJWT, deleteRecipe);

export = router;
