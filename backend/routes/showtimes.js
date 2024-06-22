import express from "express";
import { addShowtime, getShowtime } from "../controllers/showtime.js";

const router = express.Router();

router.post("/:movieId", addShowtime);
router.get("/", getShowtime);

export default router;
