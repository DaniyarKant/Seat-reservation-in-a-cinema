import express from "express";
import { addMovie, getMovie, getSingleMovie } from "../controllers/movie.js";

const router = express.Router();

router.post("/", addMovie);
router.get("/", getMovie);
router.get("/:movieId", getSingleMovie);

export default router;
