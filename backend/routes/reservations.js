import express from "express";
import { addReservation, removeReservation, getReservation } from "../controllers/reservation.js";

const router = express.Router();

router.post("/:seatNumber/:showtimeId", addReservation);
router.delete("/:reservationId", removeReservation);
router.get("/", getReservation);

export default router;
