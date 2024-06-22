import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const addReservation = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const showtimeID = req.params["showtimeId"];
        const seatNumber = req.params["seatNumber"];
        const q =
            "SELECT seats.id AS seatId, seats.status, showtimes.id AS showtimeId, showtimes.startTime FROM seats JOIN showtimes ON (seats.showtimeId = showtimes.id) WHERE seats.seatNumber = ? AND showtimes.id = ? ";

        db.query(q, [seatNumber, showtimeID], (err, seatData) => {
            if (err) return res.status(500).json(err);

            if (seatData.length > 0) {
                const { seatId, status, showtimeId, startTime } = seatData[0];
                if (status === "available") {
                    const currentDate = new Date();
                    const year = currentDate.getFullYear();
                    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
                    const day = String(currentDate.getDate()).padStart(2, "0");

                    const formattedDate = `${year}-${month}-${day}`;

                    const q =
                        "INSERT INTO reservations (`userId`, `seatId`, `showtimeId`, `reservationDate`) VALUES (?)";
                    const values = [userInfo.id, seatId, showtimeId, formattedDate];

                    db.query(q, [values], (err, data) => {
                        if (err) return res.status(500).json(err);

                        // Update seat status to 'reserved'
                        const q = "UPDATE seats SET status = 'reserved' WHERE id = ?";
                        db.query(q, [seatId], (err, updateResult) => {
                            if (err) return res.status(500).json(err);

                            return res.status(200).json("Reservation has been created");
                        });
                    });
                } else {
                    return res.status(404).json("Seat is not available");
                }
            } else {
                return res.status(404).json("Seat not found");
            }
        });
    });
};

export const removeReservation = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const reservationId = req.params["reservationId"];
        const q = "SELECT * FROM reservations WHERE id = ?";

        db.query(q, [reservationId], (err, data) => {
            if (err) return res.status(500).json(err);

            if (data.length) {
                const seatId = data[0].seatId;

                const deleteQuery = "DELETE FROM reservations WHERE id = ?";
                db.query(deleteQuery, [reservationId], (err, result) => {
                    if (err) return res.status(500).json(err);

                    const updateQuery = "UPDATE seats SET status = 'available' WHERE id = ?";
                    db.query(updateQuery, [seatId], (err, result) => {
                        if (err) return res.status(500).json(err);

                        // Check if the seat was successfully updated
                        if (result.affectedRows === 1) {
                            return res.status(200).json("Reservation removed successfully");
                        } else {
                            return res.status(500).json("Failed to update seat status");
                        }
                    });
                });
            } else {
                return res.status(404).json("Reservation does not exist");
            }
        });
    });
};

export const getReservation = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const userId = userInfo.id;
        const q = `
            SELECT reservations.id, reservations.reservationDate, showtimes.startTime, showtimes.endTime, movies.title, seats.seatNumber
            FROM reservations
            JOIN showtimes ON reservations.showtimeId = showtimes.id
            JOIN movies ON showtimes.movieId = movies.id
            JOIN seats ON seats.id = reservations.seatId
            WHERE reservations.userId = ?
        `;

        db.query(q, [userId], (err, data) => {
            if (err) return res.status(500).json(err);

            res.status(200).json(data);
        });
    });
};
