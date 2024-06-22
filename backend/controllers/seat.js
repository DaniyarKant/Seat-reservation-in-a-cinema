import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const addSeat = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const showtimeId = req.params["showtimeId"];
        const q = "INSERT INTO seats (`seatNumber`, `status`, `showtimeId`) VALUES (?)";

        const values = [req.body.seatNumber, req.body.status, showtimeId];
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json("Seat has been created");
        });
    });
};

export const getSeat = (req, res) => {
    // const q =
    //     "SELECT se.seatNumber, se.status, sh.startTime FROM seats AS se JOIN showtimes AS sh ON(se.showtimeId = sh.id)";
    const showtimeId = req.params["showtimeId"];
    const q = "SELECT * FROM seats WHERE seats.showtimeId = ?";

    db.query(q, [showtimeId], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};
