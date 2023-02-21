import express from "express";
import { register, validateToken, login } from "../controllers/user";
import extractJWT from "../middleware/extractJWT";

const router = express.Router();

router.get("/validate", extractJWT, validateToken);
router.post("/register", register);
router.post("/login", login);

export = router;
