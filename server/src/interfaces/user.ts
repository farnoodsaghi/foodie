import { Document } from "mongoose";
import { IRecipe } from "./recipe";
import { IShoppingListItem } from "./shoppingListItem";

export default interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  recipes: IRecipe[];
  shoppingList: IShoppingListItem[];
}
