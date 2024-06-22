import { db } from "../connect.js";

export const addMovie = (req, res) => {
    const q = "INSERT INTO movies (`title`, `description`, `releaseDate`,`duration`, `image`) VALUES (?)";

    const values = [req.body.title, req.body.description, req.body.releaseDate, req.body.duration, req.body.image];
    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json("Movie  has not been created");

        return res.status(200).json("Movie has been created");
    });
};

export const getMovie = (req, res) => {
    const q = "SELECT * FROM movies";

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

export const getSingleMovie = (req, res) => {
    const movieId = req.params["movieId"];

    const q = "SELECT * FROM movies WHERE movies.id = ?";

    db.query(q, [movieId], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};
