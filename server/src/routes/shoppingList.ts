import express from "express";
import {
  addShoppingItem,
  getShoppingList,
  deleteShoppingItem,
  updateShoppingList,
} from "../controllers/shoppingList";
import extractJWT from "../middleware/extractJWT";

const router = express.Router();

router.get("/", extractJWT, getShoppingList);
router.post("/", extractJWT, addShoppingItem);
router.put("/", extractJWT, updateShoppingList);
router.delete("/:id", extractJWT, deleteShoppingItem);

export = router;
