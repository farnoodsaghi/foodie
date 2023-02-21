import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/user";
import recipesRoutes from "./routes/recipes";
import shoppingListRoutes from "./routes/shoppingList";
import config from "./config/config";
import bodyParser from "body-parser";

const app = express();

mongoose
  .connect(config.mongo.url)
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((error) => console.log(error));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

app.use("/auth", authRoutes);
app.use("/recipes", recipesRoutes);
app.use("/shopping-list", shoppingListRoutes);

app.listen(config.server.port, () => {
  console.log(`Server started on port ${config.server.port}`);
});
