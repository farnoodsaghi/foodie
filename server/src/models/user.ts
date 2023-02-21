import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/user";

const userSchema: Schema = new Schema(
  {
    name: { type: "string", required: true },
    email: {
      type: "string",
      required: true,
      validate: {
        validator: async (email: string) => {
          const user = await User.findOne({ email });
          return !user;
        },
        message: (props: any) => "This email is currently in use",
      },
    },
    password: { type: "string", required: true },
    recipes: [{ type: mongoose.Types.ObjectId, ref: "Recipes" }],
    shoppingList: [{ type: mongoose.Types.ObjectId, ref: "ShoppingList" }],
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
