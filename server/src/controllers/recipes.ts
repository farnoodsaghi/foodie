import { Request, Response, NextFunction } from "express";
import Recipe from "../models/recipe";
import User from "../models/user";

export const getAllRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (res.locals.jwt) {
      const { email } = res.locals.jwt;
      const user = await User.findOne({ email: email }).populate("recipes");
      if (user) {
        res.status(200).json({ user, recipes: user.recipes });
      } else {
        res.status(401).json({ message: "unauthorized" });
      }
    } else {
      res.status(401).json({ message: "unauthorized" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message, error });
  }
};

export const addRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body;
    if (res.locals.jwt) {
      const { email } = res.locals.jwt;
      const user = await User.findOne({ email: email });
      if (user) {
        const recipe = await Recipe.create({ id });
        const addRecipe = await User.findOneAndUpdate(
          { email: email },
          { recipes: [...user.recipes, recipe] }
        );
        res.status(200).json({ message: "Recipe added successfully" });
      } else {
        res.status(401).json({ message: "unauthorized" });
      }
    } else {
      res.status(401).json({ message: "unauthorized" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message, error });
  }
};

export const deleteRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (res.locals.jwt) {
      const { email } = res.locals.jwt;
      const user = await User.findOne({ email: email }).populate("recipes");
      if (user) {
        await User.findOneAndUpdate(
          { email: email },
          { recipes: user.recipes.filter((recipe) => recipe.id !== id) }
        );
        res.status(200).json({ message: "Recipe deleted successfully" });
      } else {
        res.status(401).json({ message: "unauthorized" });
      }
    } else {
      res.status(401).json({ message: "unauthorized" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message, error });
  }
};
