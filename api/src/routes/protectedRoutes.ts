import express from "express";
import { protectedRoute } from "../controllers/protectedController";
import { verifyToken } from "../authentification/jwtMiddleware";

const router = express.Router();

router.get("/protected", verifyToken, protectedRoute);

export default router;
