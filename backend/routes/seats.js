import express from "express";
import { addSeat, getSeat } from "../controllers/seat.js";

const router = express.Router();

router.post("/:showtimeId", addSeat);
router.get("/:showtimeId", getSeat);

export default router;
