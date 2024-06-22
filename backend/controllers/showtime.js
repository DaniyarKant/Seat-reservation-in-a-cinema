import { db } from "../connect.js";

export const addShowtime = (req, res) => {
    const movieId = req.params["movieId"];
    const q = "INSERT INTO showtimes (`movieId`, `startTime`, `endTime`) VALUES (?) ";

    const values = [movieId, req.body.startTime, req.body.endTime];
    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json("Showtime has been created");
    });
};

export const getShowtime = (req, res) => {
    const q =
        "SELECT s.id, s.movieId, s.startTime, s.endTime,  m.title, m.description, m.releaseDate, m.duration, m.image FROM showtimes AS s JOIN movies AS m ON(s.movieId = m.id)";

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};
