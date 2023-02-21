import { Request, Response, NextFunction } from "express";
import ShoppingListItem from "../models/shoppingListItem";
import User from "../models/user";

export const getShoppingList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (res.locals.jwt) {
      const { email } = res.locals.jwt;
      const user = await User.findOne({ email: email }).populate(
        "shoppingList"
      );
      if (user) {
        res.status(200).json({ user, shoppingList: user.shoppingList });
      } else {
        res.status(401).json({ message: "unauthorized" });
      }
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message, error });
  }
};

export const addShoppingItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, name, amount } = req.body;
    if (res.locals.jwt) {
      const { email } = res.locals.jwt;
      const user = await User.findOne({ email: email });
      if (user) {
        const shoppingItem = await ShoppingListItem.create({
          id,
          name,
          amount,
        });
        await User.findOneAndUpdate(
          { email: email },
          { shoppingList: [...user.shoppingList, shoppingItem] }
        );
        res
          .status(200)
          .json({ message: "Successfully added a new shopping list item" });
      } else {
        res.status(401).json({ message: "unauthorized" });
      }
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message, error });
  }
};

export const updateShoppingList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (res.locals.jwt) {
      const { email } = res.locals.jwt;
      const user = await User.findOne({ email: email });
      if (user) {
        const { shoppingList } = req.body;
        const newShoppingList = [];
        for (let item of shoppingList) {
          const newItem = await ShoppingListItem.create(item);
          newShoppingList.push(newItem);
        }
        await User.findOneAndUpdate(
          { email: email },
          { shoppingList: [...newShoppingList] }
        );
        res.status(200).json({ message: "Shopping list updated successfully" });
      } else {
        res.status(401).json({ message: "unauthorized" });
      }
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message, error });
  }
};

export const deleteShoppingItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (res.locals.jwt) {
      const { email } = res.locals.jwt;
      const user = await User.findOne({ email: email }).populate(
        "shoppingList"
      );
      if (user) {
        await User.findOneAndUpdate(
          { email: email },
          { shoppingList: user.shoppingList.filter((item) => item.id !== id) }
        );
        res
          .status(200)
          .json({ message: "Successfully deleted shopping list item" });
      } else {
        res.status(401).json({ message: "unauthorized" });
      }
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message, error });
  }
};
