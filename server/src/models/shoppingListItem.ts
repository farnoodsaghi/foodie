import mongoose, { Schema } from "mongoose";

const shoppingListItemSchema: Schema = new Schema({
  id: {
    type: "string",
    required: true,
  },
  name: { type: "string", required: true },
  amount: { type: "string", required: true },
});

const ShoppingListItem = mongoose.model("ShoppingList", shoppingListItemSchema);

export default ShoppingListItem;
