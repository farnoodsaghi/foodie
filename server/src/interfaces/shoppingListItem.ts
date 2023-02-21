import { Document } from "mongoose";

export interface IShoppingListItem extends Document {
  id: string;
  name: string;
  amount: string;
}
